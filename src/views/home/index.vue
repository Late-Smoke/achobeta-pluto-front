<script setup>
// index.vue - 主页内容布局
</script>

<template>
  <div class="homepage">
    <!-- 第一排：积分情况和消息框 -->
    <div class="top-row">
      <div class="box points-box">
        <!-- 左上角显示标题，字体稍大并贴近左上角 -->
        <h3 class="title">积分情况</h3>
        
        <!-- 积分详情区域，两排四个框 -->
        <div class="points-details">
          <div class="points-item">
            <span class="item-title">本月新增</span>
            <div class="item-content">数据内容</div>
          </div>
          <div class="points-item">
            <span class="item-title">本月排名</span>
            <div class="item-content">数据内容</div>
          </div>
          <div class="points-item">
            <span class="item-title">剩余积分</span>
            <div class="item-content">数据内容</div>
          </div>
          <div class="points-item">
            <span class="item-title">累计积分</span>
            <div class="item-content">数据内容</div>
          </div>
        </div>
      </div>
      
      <div class="box messages-box">
        <h3>消息</h3>
        <p>这里显示消息内容。</p>
      </div>
    </div>

    <!-- 第二排：项目进度框 -->
    <div class="box progress-box">
      <h3>项目进度</h3>
      <p>这里显示项目进度的详情。</p>
    </div>
  </div>
</template>

<style scoped>
/* 全局样式设置 */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
  background-color: #f4f4f4;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 主页面容器 */
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

/* 第一排，左右两框并排 */
.top-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
}

/* 统一样式：积分情况框、消息框、项目进度框的样式 */
.box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
}

/* 设置每个框的高度 */
.points-box, .messages-box {
  height: 360px; /* 积分情况和消息框的固定高度 */
}

.progress-box {
  min-height: 250px; /* 使用最小高度保证框体高度 */
  width: 100%;
  max-width: 1200px;
}

/* 积分情况标题样式，贴近左上角 */
.title {
  font-size: 1.5em;
  margin: 0 0 20px 0; /* 增大标题与四个框之间的间距 */
}

/* 积分详情区域布局，使用网格布局实现两排两列 */
.points-details {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 每排两列 */
  grid-template-rows: 1fr 1fr; /* 两行 */
  gap: 30px; /* 增大子框之间的间距 */
  height: calc(100% - 60px); /* 调整高度，留出额外的底部间距 */
  margin-bottom: 20px; /* 增加底部间距，与积分情况下边框拉开距离 */
  padding: 0 20px; /* 为左右增加内边距 */
}

/* 积分子框样式，缩小子框宽度 */
.points-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 内容靠近顶部 */
  align-items: center;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 6px; /* 减少内边距 */
  text-align: center;
}

/* 每个子框的标题样式，更靠近上边框 */
.item-title {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 4px; /* 控制标题和内容间距 */
}

/* 每个子框的数据内容样式 */
.item-content {
  font-size: 0.8em;
  color: #666;
}
</style>
