<template>
    <div class="box messages-box">
      <div class="messages-header">
        <h3 class="box-title">消息</h3>
        <button class="read-all-button" @click="markAllAsRead">全部已读</button>
      </div>
      <ul class="message-list">
        <li v-for="message in messages" :key="message.id" class="message-item">
          <div class="dot-and-content" @click="openModal(message)">
            <span v-if="!message.read" class="unread-dot"></span>
            <span :class="['message-content', { read: message.read }]">
              {{ message.content.length > 22 ? message.content.slice(0, 22) + '...' : message.content }}
            </span>
          </div>
          <div class="message-right">
            <span
              :class="['message-type', { system: message.type === '系统通知', team: message.type === '团队通知' }]"
            >
              {{ message.type }}
            </span>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">&lt;</button>
        <span
          v-for="page in totalPages"
          :key="page"
          :class="['page-number', { active: page === currentPage }]"
          @click="goToPage(page)"
        >
          {{ page }}
        </span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">&gt;</button>
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">&times;</button>
          <p>{{ modalContent }}</p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';

const totalPages = ref(5);
const currentPage = ref(1);
const allMessages = ref([]);
const messages = ref([]);
const showModal = ref(false);
const modalContent = ref('');

function loadMessages() {
  const savedReadStatus = JSON.parse(localStorage.getItem('readStatus')) || {};
  const mockData = [];
  for (let i = 1; i <= 50; i++) {
    const isRead = !!savedReadStatus[i];
    mockData.push({
      id: i,
      content: `这是第${i}条消息内容。这是完整消息内容，用于展示弹窗效果。`,
      type: i % 2 === 0 ? '系统通知' : '团队通知',
      read: isRead,
    });
  }
  allMessages.value = mockData;
  updateMessages();
}

function saveReadStatus() {
  const readStatus = {};
  allMessages.value.forEach((message) => {
    readStatus[message.id] = message.read;
  });
  localStorage.setItem('readStatus', JSON.stringify(readStatus));
}

function updateMessages() {
  const start = (currentPage.value - 1) * 5;
  messages.value = allMessages.value.slice(start, start + 5);
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    updateMessages();
  }
}

function markAllAsRead() {
  allMessages.value.forEach((message) => (message.read = true));
  saveReadStatus();
  updateMessages();
}

function openModal(message) {
  message.read = true;
  saveReadStatus();
  updateMessages();
  modalContent.value = message.content;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

onMounted(() => {
  loadMessages();
});
</script>

<style scoped>
.box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  height: 360px; /* 保持框的高度固定 */
}

.box-title {
  font-size: 1.7em;
  font-weight: 530;
  margin: 0; /* 消除标题的上下边距 */
  line-height: 1; /* 确保标题紧凑 */
  padding-bottom: 10px; /* 添加标题和内容的分隔 */
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* 确保标题对齐到底部 */
}

.read-all-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
}

.message-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 250px; /* 限制消息列表的高度 */
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px; 
}

.dot-and-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}

.message-content {
  color: black;
}

.message-content.read {
  color: gray;
}

.message-type {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-size: 0.8em;
}

.message-type.system {
  background-color: green;
}

.message-type.team {
  background-color: blue;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

.page-number {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.page-number.active {
  background-color: black;
  color: white;
}

button {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

button:disabled {
  cursor: not-allowed;
  background-color: #ddd;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
