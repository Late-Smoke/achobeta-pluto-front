<script setup>
import { ref, onMounted,nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useNewUser } from '../utils/new-user';
import axios from 'axios';
import apiClient from '@/axios/axios'
// 导入点赞前后的 SVG 图标
import hand1 from '@/assets/icons/personal-center-hand1.svg';
import hand2 from '@/assets/icons/personal-center-hand2.svg';

// 路由和逻辑方法
const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: { type: String, default: '' },
  teamId: { type: String, default: '' },
  teamName: { type: String, default: '' },
  level: { type: [String, Number], default: '' },
});
console.log('接收到的参数:', props.id, props.teamId, props.teamName, props.level);

// 定义响应式变量
const likeCount = ref(0); // 点赞数
const isLiked = ref(false); // 点赞状态

const { 
  formData,// 响应式表单数据对象
  initializeNewUser,// 初始化用户权限和团队信息
  resetForm, // 重置表单逻辑
  createTeamMember,// 保存数据逻辑
} = useNewUser(router);

const selectedGender = ref("null"); // 默认值为 "null"
// 选中的角色（初始化为无权限）
const selectedRole = ref(0);

// 管理权限的选项
const roleOptions = ref([
  { label: '无权限', value: 0 },
  { label: '普通管理员', value: 1 }
]);

// 定义团队和职位的选项
const teamPositionOptions = ref([]); // 初始化为空数组
const teamPositionProps = ref({
  multiple: true,
  checkStrictly: true,
});

// 选中的团队/职位
const selectedTeamPosition = ref([]);

// 获取团队职位数据
const fetchTeamStructure = async () => {
  try {
    const response = await apiClient.get('/api/team/structure/collection', {
      params: { team_id: props.teamId },
    });
    
    console.log('获取团队职位数据',response)
    if (response.data.code === 20000) {
      const teamStructures = response.data.data.team_structures || [];

      // 根据返回的数据生成选项
      const teamOptions = teamStructures.map((item) => ({
        value: item.myself_id,
        label: item.node_name,
      }));

      // 添加一级选项
      teamPositionOptions.value = [
        {
          value: props.teamId,
          label: props.teamName || '未知团队', // 选中的团队名称
          children: teamOptions,
        },
      ];
    }else if (response.data.code === 20403) {
      ElMessage.error('权限不足，无法获取团队架构');
    } else {
      ElMessage.error('加载团队职位数据失败');
    }
  } catch (error) {
    ElMessage.error('加载团队职位数据失败，请稍后重试');
    console.error('获取团队结构失败:', error);
  }
};

// 获取用户数据函数
async function fetchUserData() {
  try {
    const response = await apiClient.get('/api/team/membermsg/details', {
      params: {
        member_id: props.id,
      },
    });
    console.log('获取用户点赞数据:', response.data);

    if (response.data.code === 20000) {
      const data = response.data.data;
      likeCount.value = data.like_count; // 确保使用like_count字段
      isLiked.value = data.is_liked === 1; // 确保使用is_liked字段作为布尔值
    } else {
      console.error('获取点赞数据失败',response.data.message);
    }
  } catch (error) {
    console.error('Error fetching like data:', error);
  }
}

// 点赞切换逻辑
async function toggleLike() {
  // 本地更新点赞状态和数值
  const originalLiked = isLiked.value;
  const originalLikeCount = likeCount.value;
  
  // 本地立即切换状态
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;

  try {
    const response = await apiClient.put(
      '/api/team/membermsg/like',
      {
        member_id: Number(props.id), // Body 参数
      },
    );

    const { code, message, data } = response.data;

    console.log('点赞请求:', response.data);
    if (code === 20000) {
      // 更新点赞数为后端返回的值
      likeCount.value = data.like_count || 0;
    } else {
      console.error('点赞请求失败:', message);
      // 如果后端返回非成功状态，恢复原始状态
      isLiked.value = originalLiked;
      likeCount.value = originalLikeCount;

      // 根据返回的具体错误码，提示用户
      handleLikeError(code, message);
    }
  } catch (error) {
    console.error('点赞请求时出错:', error);
    // 请求失败时恢复原始状态
    isLiked.value = originalLiked;
    likeCount.value = originalLikeCount;

    // 提示用户网络或其他错误
    ElMessage.error('网络错误，请稍后重试');
  }
}
// 错误处理函数
function handleLikeError(code, message) {
  switch (code) {
    case 10001:
      ElMessage.error('参数无效，请联系管理员');
      break;
    case 60003:
    case 20013:
      ElMessage.error('操作被锁定，请稍后再试');
      break;
    case 40014:
      ElMessage.error('用户不存在，请检查用户信息');
      break;
    case 40013:
      ElMessage.error('用户查询失败，请稍后重试');
      break;
    default:
      ElMessage.error(message || '未知错误，请稍后重试');
  }
}

// 页面加载时获取用户数据
onMounted(async () => {
  await fetchUserData(); // 初始化点赞数据
  await initializeNewUser(props.teamId, props.teamName); // 初始化用户权限和团队信息
  await fetchTeamStructure(); // 加载团队职位数据
});

// 重置表单
const resetUserData = async () => {
  resetForm();// 调用封装的重置逻辑
  const selectedTeamId = route.params.teamId;
  const selectedTeamName = route.params.teamName;
  selectedTeamPosition.value = []; // 清空团队和职位选中项
  selectedRole.value = 0; // 重置管理权限
  selectedGender.value = "null"; // 重置性别
  await nextTick(); // 确保视图更新
  await initializeNewUser(selectedTeamId, selectedTeamName);
};

// 保存表单
const saveUserData = async () => {
  if (!formData.value.phone_num) {
    ElMessage.warning('请填写手机号码');
    return;
  }
  const success = await createTeamMember();// 保存数据到后端
  if (success) {
    ElMessage.success('数据保存成功');
  }
};
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
                  <el-input v-model="formData.name" style="width: 240px" size="large" />
                </div>
                <div>
                  <span>性别</span>
                  <el-select v-model="formData.sex" size="large" style="width: 130px">
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
                  <el-input v-model="formData.create_date" placeholder="YYYY-MM-DD" style="width: 240px" size="large"/>
                </div>
                <div>
                  <span>所属团队/职位</span>
                  <div class="m-4">
                    <el-cascader 
                      :options="teamPositionOptions" 
                      :props="teamPositionProps" 
                      clearable 
                      v-model="selectedTeamPosition" 
                      size="large" 
                     />
                </div>
                </div>
                <div>
                <div>
                <span>管理权限</span>
                <el-select v-model="selectedRole" size="large" style="width: 205px">
                  <el-option
                    v-for="option in roleOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </div>
              </div>
              </div>
  
              <!-- 第三行 -->
              <div class="info-row">
                <div>
                  <span>身份证号</span>
                  <el-input v-model="formData.id_card" style="width: 240px" size="large" />
                </div>
                <div>
                  <div class="field-label">
                  <span>手机号码</span>
                  <span class="required">*</span>
                </div>
                <el-input v-model="formData.phone_num" style="width: 240px" size="large"/>
              </div>
                <div>
                  <span>邮箱</span>
                  <el-input v-model="formData.email" style="width: 240px" size="large"/>
                </div>
              </div>
  
              <!-- 第四行 -->
              <div class="info-row">
                <div>
                  <span>年级</span>
                  <el-input v-model="formData.grade" style="width: 240px" size="large" />
                </div>
                <div>
                  <span>专业</span>
                  <el-input v-model="formData.major" style="width: 240px" size="large" />
                </div>
                <div>
                  <span>学号</span>
                  <el-input v-model="formData.student_id" style="width: 240px" size="large" />
                </div>
              </div>
  
              <!-- 第五行 -->
              <div class="info-row">
                <div style="grid-column: 1 / 4; text-align: left;">
                  <span>实习、创业、就职经历</span>
                  <el-input v-model="formData.experience" type="textarea" :rows="5" />
                </div>
              </div>
  
              <!-- 第六行 -->
              <div class="info-row">
                <div style="grid-column: 1 / 4; text-align: left;">
                  <span>现状</span>
                  <el-input v-model="formData.status" type="textarea" :rows="4" />
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

.field-label {
  position: relative;
  display: inline-block;
  font-size: 1.1em;
}

.field-label .required {
  color: red;
  font-size: 1.2em;
  position: absolute;
  top: 0;
  right: -12px;
}

.info-row div div {
  font-size: 0.9em;
  color: #333;
}
</style>
