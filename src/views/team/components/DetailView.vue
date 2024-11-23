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

const selectedGender = ref("null"); // 默认值为 "null"

// 获取用户数据函数
async function fetchUserData() {
  try {
    const response = await axios.get('/api/GetMemberDetail', {
      params: {
        userid: localStorage.getItem('userid'),
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
      userid: localStorage.getItem('userid'),
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
          <el-icon class="back-icon" @click="$router.push('/team')">
            <ArrowLeftBold />
          </el-icon>
          <div class="title-with-icon">
            <h2>个人信息</h2>
            <!-- 用户图标 -->
            <img src="@/assets/icons/personal-center-pepole.svg" alt="用户图标" class="info-icon" />
          </div>
          <div class="action-section">
            <!-- 重置按钮 -->
            <el-button type="info" @click="resetUserData" class="reset-button">重置</el-button>
            <!-- 保存按钮 -->
            <el-button type="primary" @click="saveUserData" class="save-button">保存</el-button>
            <!-- 点赞按钮 -->
            <button @click="toggleLike" class="like-button">
              <img :src="isLiked ? hand2 : hand1" alt="点赞图标" class="like-icon" />
              <span class="like-count">{{ likeCount }}</span>
            </button>
          </div>
        </div>
  
        <!-- 内容区域 -->
        <div class="info-box">
          <el-scrollbar class="custom-scrollbar" height="600px"
           :native="false"
           :noresize="false"
           >
           <div class="scrollbar-content">
            <!-- 滚动条中的内容 -->
            <div class="info-section">
              <!-- 第一行 -->
              <div class="info-row">
                <div>
                  <span>真实姓名</span>
                  <el-input style="width: 240px" size="large" />
                </div>
                <div>
                  <span>性别</span>
                  <el-select v-model="selectedGender" size="large" style="width: 130px">
                    <el-option label="未选择" value="null" />
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </div>
              </div>
  
              <!-- 第二行 -->
              <div class="info-row">
                <div>
                  <span>加入时间</span>
                  <p>2000/00/00</p>
                </div>
                <div>
                  <span>所属团队/职位</span>
                  <p>你好</p>
                </div>
              </div>
  
              <!-- 第三行 -->
              <div class="info-row">
                <div>
                  <span>身份证号</span>
                  <el-input style="width: 240px" size="large" />
                </div>
                <div>
                  <span>手机号</span>
                  <p>12345678912</p>
                </div>
                <div>
                  <span>邮箱</span>
                  <el-input style="width: 240px" size="large" />
                </div>
              </div>
  
              <!-- 第四行 -->
              <div class="info-row">
                <div>
                  <span>年级</span>
                  <el-input style="width: 240px" size="large" />
                </div>
                <div>
                  <span>专业</span>
                  <el-input style="width: 240px" size="large" />
                </div>
                <div>
                  <span>学号</span>
                  <el-input style="width: 240px" size="large" />
                </div>
              </div>
  
              <!-- 第五行 -->
              <div class="info-row">
                <div style="grid-column: 1 / 4; text-align: left;">
                  <span>实习、创业、就职经历</span>
                  <el-input type="textarea" :rows="5" />
                </div>
              </div>
  
              <!-- 第六行 -->
              <div class="info-row">
                <div style="grid-column: 1 / 4; text-align: left;">
                  <span>现状</span>
                  <el-input type="textarea" :rows="4" />
                </div>
              </div>
            </div>
           </div>
          </el-scrollbar>
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
  background: linear-gradient(to bottom, #fdf6f0, #d7e3fc); /* 消息框背景颜色 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px; /* 包裹内边距 */
  margin: 0 auto;
  height: 750px;
  position: relative; /* 添加相对定位 */
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

/* 滚动条样式 */
.custom-scrollbar ::v-deep(.el-scrollbar__bar) {
  background: transparent;
}

.custom-scrollbar ::v-deep(.el-scrollbar__thumb) {
  height: 5px;
  background: #90a4ae;
  border-radius: 4px;
  opacity: 0.8;
}

.custom-scrollbar ::v-deep(.el-scrollbar__thumb:hover) {
  background: #607d8b;
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
  gap: 10px; /* 保存按钮和点赞按钮之间的间距 */
  margin-left: auto; /* 推动到右侧 */
}

.save-button {
  height: 35px; 
  width: 80px;
  margin-right:50px; 
}

.reset-button {
  background-color: #c6c0c0ec;
  color: black;
  height: 35px; 
  width: 80px;
  margin-right:15px; 
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

.info-box {
  margin-top: 20px;
  position: relative;
  width: 100%;
}

/* 内容容器样式 */
.scrollbar-content {
  padding: 0 140px 20px 120px; /* 左右添加足够的内边距，右侧多加一些为滚动条预留空间 */
  box-sizing: border-box;
}

/* 修改滚动条样式 */
.custom-scrollbar ::v-deep(.el-scrollbar__wrap) {
  overflow-x: hidden !important; /* 隐藏水平滚动条 */
}

.custom-scrollbar ::v-deep(.el-scrollbar__bar.is-horizontal) {
  display: none; /* 隐藏水平滚动条 */
}

.custom-scrollbar ::v-deep(.el-scrollbar__bar.is-vertical) {
  width: 6px; /* 调整垂直滚动条宽度 */
  right: 20px; /* 将滚动条向右移动一些距离 */
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width:100%;
}

.info-row {
  display: grid;
  grid-template-columns: 240px 240px 240px; /* 每列固定宽度 */
  gap: 171px;
  align-items: start;
  width:100%;
}

.info-row div {
  text-align: left;
  padding: 0;
  margin: 0;
}

.info-row span {
  font-weight: 545;
  font-size: 1.1em;
  color: #666;
  display: block;
  margin-bottom: 8px;
}

.el-input {
  display: block;
  width: 100%;
}

.info-row div div {
  font-size: 0.9em;
  color: #333;
}
</style>
