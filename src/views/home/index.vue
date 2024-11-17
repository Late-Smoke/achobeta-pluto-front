<script setup>
import { ref, onMounted } from 'vue';
import { getPoints } from './utils/getPoints';
import Progress from '@/views/home/utils/progress.vue';

// 积分数据
const userId = localStorage.getItem('userid');
const totalPoints = ref('00');
const currentPoints = ref('00');
const monthlyPoints = ref('00');
const monthlyRanking = ref('00');

async function fetchPoints() {
  if (!userId) {
    console.warn('用户ID不存在，无法获取积分信息');
    return;

  }
  const pointsData = await getPoints(userId);
  if (pointsData) {
    totalPoints.value = pointsData.total_points || '00';
    currentPoints.value = pointsData.current_points || '00';
    monthlyPoints.value = pointsData.monthly_points || '00';
    monthlyRanking.value = pointsData.monthly_ranking || '00';
  } else {
    console.error('积分请求失败');
  }
}

// 消息框数据
const totalPages = ref(5);
const currentPage = ref(1);
const allMessages = ref([]); // 全部消息数据
const messages = ref([]); // 当前页显示的消息
const showModal = ref(false);
const modalContent = ref('');

// 生成假数据
function generateMockMessages() {
  const mockData = [];
  for (let i = 1; i <= 50; i++) {
    mockData.push({
      id: i,
      content: `这是第${i}条消息内容。这是完整消息内容，用于展示弹窗效果。`,
      type: i % 2 === 0 ? '系统通知' : '团队通知',
      read: i % 3 === 0,
    });
  }
  allMessages.value = mockData;
  updateMessages(); // 初始化当前页
}

// 更新当前页消息
function updateMessages() {
  const start = (currentPage.value - 1) * 5;
  messages.value = allMessages.value.slice(start, start + 5);
}

// 翻页
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    updateMessages();
  }
}

// 标记全部已读
function markAllAsRead() {
  allMessages.value.forEach((message) => (message.read = true)); // 更新数据源
  updateMessages(); // 同步更新当前页
}

// 弹窗操作
function openModal(message) {
  modalContent.value = message.content;
  message.read = true;
  updateMessages(); // 同步当前页
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

// 初始化数据
onMounted(() => {
  fetchPoints();
  generateMockMessages();
});
</script>


<template>
  <div class="homepage">
    <div class="top-row">
      <!-- 积分框 -->
      <div class="box points-box">
        <h3 class="box-title">积分情况</h3>
        <div class="points-details">
          <div class="points-item">
            <span class="item-title">本月新增</span>
            <div class="item-content">{{ monthlyPoints }}</div>
          </div>
          <div class="points-item">
            <span class="item-title">本月排名</span>
            <div class="item-content">{{ monthlyRanking }}</div>
          </div>
          <div class="points-item">
            <span class="item-title">剩余积分</span>
            <div class="item-content">{{ currentPoints }}</div>
          </div>
          <div class="points-item">
            <span class="item-title">累计积分</span>
            <div class="item-content">{{ totalPoints }}</div>
          </div>
        </div>
      </div>

      <!-- 消息框 -->
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
        <!-- 分页 -->
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
      </div>
    </div>

    <!-- 第二排：项目进度框 -->
    <div class="box progress-box">
        <Progress/>
    </div>

    <!-- 弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <p>{{ modalContent }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面整体布局 */
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  width: 100%; /* 确保占满可用宽度 */
}

.top-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
}

.box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
}

.box-title {
  font-size: 1.7em; /* 放大标题字体 */
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 0; /* 去掉标题与顶部的默认间距 */
}

.points-box {
  height: 360px;
}

.points-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
  height: calc(100% - 60px);
  margin-bottom: 20px;
}

.points-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 6px;
  text-align: center;
}

.item-title {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 4px;
}

.item-content {
  font-size: 4em;
  color: #333;
  line-height: 1;
  font-weight: 100;
}

.progress-box {
  height: 250px;
  width: 100%;
  max-width: 1200px;
  flex-shrink: 0;
  box-sizing: border-box;
}

/* 消息框样式 */
.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  max-height: 250px;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
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

/* 分页样式 */
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

/* 弹窗样式 */
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
