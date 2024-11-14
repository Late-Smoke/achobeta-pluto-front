<script setup>
import { ref, onMounted } from 'vue';
import useLike from './utils/useLike';
import useUserData from './utils/useUserData';

const userData = ref({});
const likeCount = ref(0);
const { toggleLike, isLiked } = useLike(likeCount);
const { fetchUserData } = useUserData();

// 加载用户数据
onMounted(async () => {
  const response = await fetchUserData();
  if (response && response.code === 200) {
    userData.value = response.data;
    likeCount.value = response.data.likecount;
  } else {
    console.error('获取个人中心用户数据请求失败');
  }
});
</script>

<template>
  <div class="personal-center">
    <!-- 内部框 -->
    <div class="info-box">
      <div class="header">
        <h2>&lt; 个人信息</h2>
        <div class="like-section">
          <!-- 点赞按钮和点赞数 -->
          <button @click="toggleLike" class="like-button">
            <!-- 动态切换点赞图标 -->
            <i :class="isLiked.value ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'"></i>
            <span class="like-count">{{ likeCount }}</span>
          </button>
        </div>
      </div>

      <div class="info-section">
        <!-- 第二行 -->
        <div class="info-row">
          <div>
            <span>真实姓名</span>
            <div>{{ userData.name }}</div>
          </div>
          <div>
            <span>性别</span>
            <div>{{ userData.sex }}</div>
          </div>
          <div></div> <!-- 空列 -->
        </div>

        <!-- 第三行 -->
        <div class="info-row">
          <div>
            <span>加入时间</span>
            <div>{{ userData.create_date }}</div>
          </div>
          <div>
            <span>所属团队/职位</span>
            <div>{{ userData.strucet_name }}</div>
          </div>
          <div></div>
        </div>

        <!-- 第四行 -->
        <div class="info-row">
          <div>
            <span>身份证号</span>
            <div>{{ userData.idcard }}</div>
          </div>
          <div>
            <span>手机号</span>
            <div>{{ userData.phone_num }}</div>
          </div>
          <div>
            <span>邮箱</span>
            <div>{{ userData.email }}</div>
          </div>
        </div>

        <!-- 第五行 -->
        <div class="info-row">
          <div>
            <span>年级</span>
            <div>{{ userData.grade }}</div>
          </div>
          <div>
            <span>专业</span>
            <div>{{ userData.major }}</div>
          </div>
          <div>
            <span>学号</span>
            <div>{{ userData.student_id }}</div>
          </div>
        </div>

        <!-- 第六行 -->
        <div class="info-row">
          <div>
            <span>实习、创业、就职经历</span>
            <div>{{ userData.experience }}</div>
          </div>
          <div></div>
          <div></div>
        </div>

        <!-- 最后一行 -->
        <div class="info-row">
          <div>
            <span>现状</span>
            <div>{{ userData.status }}</div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-center {
  padding: 16px;
  background-color: #f4f4f4; /* 浅灰色背景，使内框外部区域为浅灰色 */
  min-height: 100vh; /* 确保背景色覆盖整个视口 */
}

/* 新增的个人信息框样式 */
.info-box {
  margin: 0 auto;
  padding: 10px; /* 内边距，给内容留出空间 */
  border-radius: 8px; /* 圆角效果 */
  background-color: #fff; /* 背景色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  min-height: 720px; /* 增加最小高度，确保内框较高 */
}

/* header部分和like按钮的布局 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  font-weight: 400; /* 调整字体粗细 */
}

.like-section {
  display: flex;
  align-items: center;
}

.like-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
}

.like-button i {
  font-size: 2em; /* 增大图标大小 */
  color: gray; /* 默认颜色 */
}

.like-button .fa-solid {
  color: red; /* 已点赞颜色 */
}

.like-button .fa-regular {
  color: gray; /* 未点赞颜色 */
}

.like-count {
  margin-top: 4px;
  font-size: 1em;
  color: #333;
}

/* 栅格布局 */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 三列布局，每列均分 */
  gap: 16px;
  padding: 10px 0;
}

.info-row div {
  text-align: center;
}

.info-row span {
  display: block;
  font-weight: bold;
  font-size: 0.85em;
  color: #666;
  margin-bottom: 4px;
}

.info-row div div {
  font-size: 0.9em;
  color: #333;
}
</style>
