<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 导入点赞前后的 SVG 图标
import hand1 from '@/assets/icons/personal-center-hand1.svg';
import hand2 from '@/assets/icons/personal-center-hand2.svg';

// 定义响应式变量
const userData = ref({}); // 用户个人信息
const likeCount = ref(0); // 点赞数
const isLiked = ref(false); // 点赞状态

// 保存初始状态的变量
const initialIsLiked = ref(false);
const initialLikeCount = ref(0);

// 获取用户数据函数
async function fetchUserData() {
  try {
    const response = await axios.get('/api/GetMemberDetail', {
      params: {
        member_id: localStorage.getItem('userid'),
      },
    });
    if (response.data.code === 200) {
      const data = response.data.data;
      userData.value = data; // 保存用户数据
      likeCount.value = data.likecount || 0; // 初始化点赞数
      isLiked.value = data.isLiked || false; // 初始化点赞状态

      // 保存初始状态
      initialIsLiked.value = isLiked.value;
      initialLikeCount.value = likeCount.value;
    } else {
      console.error('获取个人中心用户数据失败');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// 点赞切换逻辑
async function toggleLike() {
  // 本地立即切换状态
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;

  try {
    const response = await axios.put('/api/PutLikeCount', {
      atoken: localStorage.getItem('atoken'),
      member_id: localStorage.getItem('userid'),
    });

    if (response.data.code === 200) {
      // 使用后端返回的最新点赞数
      likeCount.value = response.data.likecount;
    } else {
      console.error('点赞请求失败');
      rollbackToInitialState();
    }
  } catch (error) {
    console.error('点赞请求出错:', error);
    rollbackToInitialState();
  }
}

// 回滚到初始状态函数
function rollbackToInitialState() {
  isLiked.value = initialIsLiked.value;
  likeCount.value = initialLikeCount.value;
}

// 页面加载时获取用户数据
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <div class="personal-center">
    <!-- 外层容器 -->
    <div class="content-wrapper">
      <div class="header">
        <el-icon class="back-icon" @click="$router.push('/home')">
          <ArrowLeftBold />
        </el-icon>
        <div class="title-with-icon">
          <h2>个人信息</h2>
          <!-- 用户图标 -->
          <img src="@/assets/icons/personal-center-pepole.svg" alt="用户图标" class="info-icon" />
        </div>
        <div class="action-section">
          <!-- 点赞按钮 -->
          <button @click="toggleLike" class="like-button">
            <img :src="isLiked ? hand2 : hand1" alt="点赞图标" class="like-icon" />
            <span class="like-count">{{ likeCount }}</span>
          </button>
        </div>
      </div>

      <!-- 使用 el-scrollbar 包裹滚动内容 -->
      <div class="info-box">
        <el-scrollbar class="custom-scrollbar" height="500px" wrap-style="overflow-y: auto; overflow-x: hidden;">
          <div class="info-section">
            <!-- 第二行 -->
            <div class="info-row">
              <div>
                <span>真实姓名</span>
                <div>{{ userData.name || '未知' }}</div>
              </div>
              <div>
                <span>性别</span>
                <div>{{ userData.sex || '未知' }}</div>
              </div>
              <div></div>
            </div>

            <!-- 第三行 -->
            <div class="info-row">
              <div>
                <span>加入时间</span>
                <div>{{ userData.create_date || '未知' }}</div>
              </div>
              <div>
                <span>所属团队/职位</span>
                <div>{{ userData.strucet_name || '未知' }}</div>
              </div>
              <div></div>
            </div>

            <!-- 第四行 -->
            <div class="info-row">
              <div>
                <span>身份证号</span>
                <div>{{ userData.idcard || '未知' }}</div>
              </div>
              <div>
                <span>手机号</span>
                <div>{{ userData.phone_num || '未知' }}</div>
              </div>
              <div>
                <span>邮箱</span>
                <div>{{ userData.email || '未知' }}</div>
              </div>
            </div>

            <!-- 第五行 -->
            <div class="info-row">
              <div>
                <span>年级</span>
                <div>{{ userData.grade || '未知' }}</div>
              </div>
              <div>
                <span>专业</span>
                <div>{{ userData.major || '未知' }}</div>
              </div>
              <div>
                <span>学号</span>
                <div>{{ userData.student_id || '未知' }}</div>
              </div>
            </div>

            <!-- 第六行 -->
            <div class="info-row">
              <div>
                <span>实习、创业、就职经历</span>
                <div>{{ userData.experience || '未知' }}</div>
              </div>
            </div>

            <!-- 最后一行 -->
            <div class="info-row">
              <div>
                <span>现状</span>
                <div>{{ userData.status || '未知' }}</div>
              </div>
            </div>
          </div>
        </el-scrollbar>

        <!-- 右下角图标 -->
        <div class="message-icon">
          <img src="@/assets/icons/personal-center-message.svg" alt="消息图标" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-center {
  background-color: #f4f4f4; /* 浅灰色背景 */
}

/* 包裹 header 和 info-box */
.content-wrapper {
  display: flex;
  flex-direction: column; /* 让子元素按列布局 */
  background: linear-gradient(to bottom, #fdf6f0, #d7e3fc); /* 消息框背景颜色 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px; /* 包裹内边距 */
  margin: 0 auto;
  height: 750px; /* 固定高度*/
}

.back-icon {
  font-size: 26px;
  color: #333;
  cursor: pointer;
  margin-top: 2px;
}

.back-icon:hover {
  color: #409eff; /* 悬停时变为主题色 */
}

.info-box {
  flex: 1; /* 占据剩余空间 */
  position: relative; /* 使图标相对于滚动内容区域 */
  margin-top: 20px; /* 为 info-box 添加顶部间距 */
  padding: 10px 120px; /* 左侧增加额外的内边距 */
  max-height: 800px; /* 限制高度 */
}

.el-scrollbar__bar {
  background: #cfd8dc; /* 滚动条的背景色 */
  border-radius: 4px;
}

.custom-scrollbar ::v-deep(.el-scrollbar__bar) {
  background: transparent; /* 滚动条背景透明 */
}

.custom-scrollbar ::v-deep(.el-scrollbar__thumb) {
  height: 5px; /* 固定滑块高度 */
  background: #90a4ae; /* 滑块颜色 */
  border-radius: 4px;  /* 滑块圆角 */
  opacity: 0.8;        /* 滑块透明度 */
}

.custom-scrollbar ::v-deep(.el-scrollbar__thumb:hover) {
  background: #607d8b; /* 鼠标悬停时滑块颜色 */
}

.info-box .message-icon {
  position: absolute; /* 绝对定位 */
  bottom: 0px; /* 距离底部 */
  right: 0px; /* 距离右侧 */
}

.message-icon img {
  width: 110px; /* 控制图标大小 */
  opacity: 0.8; /* 轻微透明效果 */
  transition: opacity 0.5s; /* 添加鼠标悬停效果 */
}

.message-icon img:hover {
  opacity: 1; /* 悬停时变为不透明 */
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: flex-start; /* 标题和图标区域靠左对齐 */
  align-items: flex-start; /* 标题和图标靠上对齐 */
  gap: 5px; /* 分隔“返回按钮”和标题部分的距离 */
}

.title-with-icon {
  display: flex;
  gap: 10px; /* 图标与标题的间距 */
}

.title-with-icon h2 {
  font-size: 1.7em; /* 标题字体大小 */
  font-weight: 550; 
  color: #333; /* 标题颜色 */
  margin: 0; /* 去掉标题的默认外边距 */
}

.title-with-icon .info-icon {
  width: 45px; /* 图标宽度 */
  transition: transform 0.3s; /* 鼠标悬停动画 */
}

.title-with-icon .info-icon:hover {
  transform: scale(1.2); /* 鼠标悬停时放大图标 */
  cursor: pointer;
}

.action-section {
  display: flex;
  align-items: center;
  margin-left: auto; /* 推动到右侧 */
}

.like-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
}

.like-icon {
  width: 40px; /* 图标宽度 */
  height: 40px; /* 图标高度 */
}

.like-count {
  margin-top: 4px;
  font-size: 1em;
  color: #333;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 171px;
  align-items: start;
}

.info-row div {
  text-align: left;
  padding: 2px 0;
}

.info-row span {
  font-weight: 545;
  font-size: 1.1em;
  color: #666;
  display: block;
  margin-bottom: 8px;
}

.info-row div div {
  font-size: 0.9em;
  color: #333;
  margin-bottom: 13px;
}
</style>
