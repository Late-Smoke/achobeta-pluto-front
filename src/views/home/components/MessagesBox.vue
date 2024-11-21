<template>
  <div class="box messages-box">
    <div class="messages-header">
      <h3 class="box-title">消息</h3>
      <el-button type="primary" text class="read-all-button" @click="markAllAsRead">全部已读</el-button>
    </div>

    <!-- 消息列表 -->
    <ul class="message-list">
      <li
        v-for="message in messages"
        :key="message.user_message_id"
        class="message-item"
      >
        <div class="dot-and-content" @click="handleMessageClick(message)">
          <span v-if="!message.is_read" class="unread-dot"></span>
          <span :class="['message-content', { read: message.is_read }]">
            {{ message.content.length > 22
              ? message.content.slice(0, 25) + '...'
              : message.content }}
          </span>
        </div>
        <div class="message-right">
          <span
            :class="['message-type', { system: message.type === 0, team: message.type === 1 }]"
          >
            {{ message.type === 0 ? '系统通知' : '团队通知' }}
          </span>
        </div>
      </li>
      <p v-if="messages.length === 0" class="no-data-text">暂无信息</p>
    </ul>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalMessages"
        :page-size="5"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 弹框 -->
    <el-dialog
      v-model="showModal"
      title="消息详情"
      width="500px"
      align-center
      class="custom-dialog"
    >
      <p class="modal-text">{{ modalContent }}</p>
      <template #footer>
        <el-button @click="closeModal" class="custom-close-button">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getMessages, markMessageAsRead, markMessagesAsRead } from '../utils/message.js';

const messages = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalMessages = ref(0);
const showModal = ref(false);
const modalContent = ref('');
const timestamp = ref(0);
let intervalId = null;
// 获取 atoken
const atoken = localStorage.getItem('atoken') || '';

const fetchMessages = async (page = 1) => {
  try {
    const data = await getMessages(atoken, page, timestamp.value);
    if (data.code === 200) {
      if (data.data.messages && data.data.messages.length > 0) {
        messages.value = data.data.messages.filter((msg) => msg.content);
        totalPages.value = data.data.total_pages || 1;
        totalMessages.value = data.data.total_pages * 5;
      } else {
        messages.value = [];
        totalPages.value = 1;
        totalMessages.value = 0;
      }
    } else {
      console.error('消息请求失败:', data.message);
    }
  } catch (error) {
    console.error('消息请求错误:', error);
  }
};

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchMessages(page);
};

const markAllAsRead = async () => {
  const unreadMessages = messages.value.filter((msg) => !msg.is_read);
  const userMessageIds = unreadMessages.map((msg) => msg.user_message_id);

  try {
    const data = await markMessagesAsRead(userMessageIds);
    if (data.code === 200) {
      messages.value.forEach((msg) => (msg.is_read = true));
    } else {
      console.error('全部已读请求失败:', data.message);
    }
  } catch (error) {
    console.error('全部已读请求失败:', error);
  }
};

const handleMessageClick = async (message) => {
  try {
    modalContent.value = message.content;
    showModal.value = true;
    if (!message.is_read) {
      await markMessageAsRead(message.user_message_id); // 单条消息标记为已读
      message.is_read = true; // 更新本地状态
    }
  } catch (error) {
    console.error('标记消息为已读失败:', error);
  }
};

const closeModal = () => {
  showModal.value = false;
};

const checkForUpdates = async () => {
  try {
    const data = await getMessages(atoken, 1, timestamp.value);
    if (data.code === 200 && data.data.is_updated) {
      await fetchMessages(1);
    }
  } catch (error) {
    console.error('更新检查失败:', error);
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    if (intervalId) clearInterval(intervalId);
  } else {
    intervalId = setInterval(checkForUpdates, 60000);
  }
};

onMounted(() => {
  fetchMessages();
  intervalId = setInterval(checkForUpdates, 60000);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 分页组件始终在底部 */
  height: 100%; /* 父容器占满高度 */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.message-list {
  flex-grow: 1; /* 消息列表占据剩余空间 */
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 250px;
  list-style: none;
}

.no-data-text {
  text-align: center;
  color: gray;
  font-size: 1em;
  margin-top: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>


<style scoped>
/* 消息框样式 */
.box {
  background-color: #ffffff; /* 消息框背景颜色 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 20px; /* 内边距 */
  flex: 1;
  height: 360px; /* 高度固定 */
}

.box-title {
  font-size: 1.7em; /* 标题字体大小 */
  font-weight: 530;
  margin: 0;
  line-height: 1;
  padding-bottom: 10px;
}

.read-all-button {
  font-size: 1.2em; /* 调整字体大小 */
  padding: 5px 10px; /* 内边距调整 */
}


.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  background-color: red; /* 未读标记为红点 */
  border-radius: 50%;
}

.message-content {
  color: black;
}

.message-content.read {
  color: gray; /* 已读消息为灰色 */
}

.message-type {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-size: 0.8em;
}

.message-type.system {
  background-color: #67C23A; /* Success 按钮的默认背景颜色 */
  color: white; /* 白色文字 */
  border-radius: 12px; /* 圆角 */
  padding: 5px 10px; /* 内边距 */
  font-size: 1em; /* 字体大小 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 平滑过渡效果 */
}

.message-type.system:hover {
  background-color: #85ce61; /* 悬停时的颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 悬停时增加阴影 */
}

.message-type.team {
  background-color: #409EFF; /* Primary 按钮的默认背景颜色 */
  color: white; /* 白色文字 */
  border-radius: 12px; /* Primary 按钮的圆角 */
  padding: 5px 10px; /* 内边距 */
  font-size: 1em; /* 字体大小 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 平滑过渡效果 */
}

.message-type.team:hover {
  background-color: #66b1ff; /* 悬停时的颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 悬停时增加阴影 */
}

/* 分页容器样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center; /* 确保垂直居中 */
  margin-top: 10px;
}

.no-data-text {
  text-align: center;
  color: gray;
  font-size: 3em;
  margin-top: 20px;
}

/* 自定义弹框样式 */
::v-deep(.custom-dialog) {
  border-radius: 15px; /* 弹框圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* 弹框阴影 */
  background-color: #ffffff; /* 去掉背景颜色，使用纯白 */
  overflow: hidden;
  animation: fadeIn 0.5s ease; /* 弹框淡入动画 */
}

/* 弹框标题样式 */
::v-deep(.custom-dialog .el-dialog__header) {
  color: #333; /* 标题文字颜色 */
  padding: 10px 20px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px dashed #cccccc; /* 分隔线，使用虚线效果 */
}

/* 弹框关闭按钮样式 */
::v-deep(.custom-dialog .el-dialog__close) {
  font-size: 20px;
  color: #555; /* 关闭按钮颜色 */
  transition: color 0.3s ease;
}

::v-deep(.custom-dialog .el-dialog__close:hover) {
  color: #f56c6c; /* 悬停关闭按钮颜色 */
}

/* 弹框内容样式 */
::v-deep(.custom-dialog .modal-text) {
  color: #333; /* 弹框内容颜色 */
  font-size: 1.2em; /* 弹框内容字体大小 */
  line-height: 1.6; /* 弹框内容行高 */
  padding: 15px 20px; /* 内容内边距 */
  text-align: left; /* 左对齐 */
  background-color: #f9f9f9; /* 内容背景颜色 */
  border-radius: 10px; /* 内容区域圆角 */
  margin: 10px; /* 内容外边距 */
}

/* 按钮样式 */
::v-deep(.custom-close-button) {
  background-color: #007bff; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

::v-deep(.custom-close-button:hover) {
  background-color: #0056b3; /* 悬停按钮背景颜色 */
}

/* 淡入动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


