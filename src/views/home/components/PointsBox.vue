<template>
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
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getPoints } from '../utils/getPoints';
  
  // 定义积分数据
  const userId = localStorage.getItem('userid');
  const totalPoints = ref('00');
  const currentPoints = ref('00');
  const monthlyPoints = ref('00');
  const monthlyRanking = ref('00');
  
  // 获取积分数据
  onMounted(async () => {
    const pointsData = await getPoints(userId);
    if (pointsData) {
      totalPoints.value = pointsData.total_points || '00';
      currentPoints.value = pointsData.current_points || '00';
      monthlyPoints.value = pointsData.monthly_points || '00';
      monthlyRanking.value = pointsData.monthly_ranking || '00';
    }
  });
  </script>
  
  <style scoped>
  .box {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    flex: 1;
  }
  
  .box-title {
    font-size: 1.7em;
    font-weight: 530;
    margin-bottom: 15px;
    margin-top: 0;
  }
  
  .points-box {
    height: 360px; /* 固定高度 */
  }
  
  .points-details {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 两列布局 */
    grid-template-rows: 1fr 1fr; /* 两行布局 */
    gap: 30px; /* 网格间隙 */
    height: calc(100% - 60px); /* 减去标题高度 */
  }
  
  .points-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #000; /* 边框样式 */
    border-radius: 8px; /* 圆角 */
    padding: 6px;
    text-align: center;
  }
  
  .item-title {
    font-size: 1em;
    font-weight: 520;
    margin-bottom: 10px; /* 标题和内容间距 */
  }
  
  .item-content {
    font-size: 4em; /* 数字的字体大小 */
    color: #333;
    line-height: 1;
    font-weight: 100;
  }
  </style>
  