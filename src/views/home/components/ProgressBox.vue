<script setup>

</script>

<template>
<slot name="Progress">
  <div class="progress-box">
    <h3 class="box-title">项目进度</h3>
    <div class="progress-details">
      <div class="progress-item">
          <span class="item-title">总任务数</span>
          <div class="item-content">{{  }}</div>
      </div>

      <div class="progress-item">
          <span class="item-title">我的未完成任务</span>
          <div class="item-content">{{  }}</div>
      </div>

      <div class="progress-item">
          <span class="item-title">即将逾期</span>
          <div class="item-content">{{  }}</div>
      </div>

      <div class="progress-item">
          <span class="item-title">已逾期</span>
          <div class="item-content">{{  }}</div>
      </div>
    </div>
  </div>
   
</slot>
</template>

<style scoped>

.progress-box {
height: 250px; /* 高度固定为250px */
width: 100%; /* 宽度占满容器 */
width: 1200px; /* 宽度 */
flex-shrink: 0; /* 防止压缩 */
box-sizing: border-box; /* 包括padding和border */
background-color: #fff; /* 白色背景 */
border-radius: 8px; /* 圆角 */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
padding: 20px; /* 内边距 */
}

.box-title {
font-size: 1.7em; /* 字体大小 */
font-weight: 530; /* 粗体 */
margin-bottom: 0px; /* 底部间距 */
margin-top: 0; /* 去掉顶部默认间距 */
margin-left: 20px;;
}


.progress-details {
    font-size: 0;
    margin-left:60px;
}
.progress-item {
    display: inline-block;
    width: 200px;
    height: 125px;
    margin: 30px;
    font-size:20px;
    border: 1px solid #000;
    border-radius: 8px;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    text-align: center;
}


</style>