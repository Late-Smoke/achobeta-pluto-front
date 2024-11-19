<script setup>
import { getProgressApi } from '@/utils/api/home'

const total_task_count = ref('0');
const incomplete_task_count = ref('0');
const upcoming_overdue_task_count = ref('0');
const overdue_task_count = ref('0');

onMounted(async () => {
    const atoken = localStorage.getItem('atoken');
    getProgressApi(atoken)
    .then(data => {
      total_task_count.value = data.total_task_count;
      incomplete_task_count.value = data.incomplete_task_count;
      upcoming_overdue_task_count.value = data.upcoming_overdue_task_count;
      overdue_task_count.value = data.overdue_task_count;
  })
  .catch(error => {
    ElMessage.error('项目进度获取失败。')
    console.error('Error fetching progress:', error);
  });
  });
</script>

<template>
  <slot name="Progress">
    <div class="progress-box">
      <el-icon><Calendar /></el-icon>
      <h3 class="box-title">项目进度</h3>
      <div class="card-container">
        <el-card class="progress-card" shadow="hover">
          <template #header>
            <div class="item-title">
              <span>总任务数</span>
            </div>
          </template>
          <div class="item-content">{{ total_task_count }}</div>
        </el-card>
 
        <el-card class="progress-card" shadow="hover">
          <template #header>
            <div class="item-title">
              <span>我的未完成任务</span>
            </div>
          </template>
          <div class="item-content">{{ incomplete_task_count }}</div>
        </el-card>
 
        <el-card class="progress-card" shadow="hover">
          <template #header>
            <div class="item-title">
              <span>即将逾期</span>
            </div>
          </template>
          <div class="item-content">{{ upcoming_overdue_task_count }}</div>
        </el-card>
 
        <el-card class="progress-card" shadow="hover">
          <template #header>
            <div class="item-title">
              <span>已逾期</span>
            </div>
          </template>
          <div class="item-content">{{ overdue_task_count }}</div>
        </el-card>
      </div>
    </div>
  </slot>
</template>

<style scoped>

.progress-box {
  width:1200px;
  height:300px;
  background-color: #fff; /* 白色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  padding:40px;
}
 
.box-title {
  font-size: 1.7em; /* 字体大小 */
  font-weight: 530; /* 粗体 */
  margin-bottom: 20px; /* 底部间距 */
  margin-top: 0; /* 去掉顶部默认间距 */
  margin-left: 20px;
}
 
.card-container {
  margin:0px;
  display: flex; 
  justify-content: space-evenly; 
  width: 100%; 
  height:100%;
}
 
.progress-card {
  width:230px;
  height:70%;
  padding:5px;
  background-color: rgba(220, 234, 247, 0.05);
  border-top:solid 1px #333;
  border-radius: 0px 0px 20px 0px;
}

.progress-card:hover {
  background-color: rgba(220, 234, 247, 0.15);
  border-radius: 5px 10px 30px 5px;
  border:solid 1px #333;
  box-shadow: rgba(126, 133, 152, 0.514);
}
 
.item-content , .item-title {
  margin-top: 10px;
  font-size: 1.5em; /* 数字的字体大小，可以根据需要调整 */
  color: #333;
  line-height: 1;
  font-weight: 100;
  text-align: center;
}

.item-title {
  font-weight: 500; /* 字体加�� */
}
</style>