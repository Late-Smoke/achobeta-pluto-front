<template>
    <div class="box progress-box">
      <h3 class="box-title">项目进度</h3>
      <p>这里显示项目进度的详情。</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* 项目进度框样式 */
  .progress-box {
    height: 200px; /* 高度固定为250px */
    width: 100%; /* 宽度占满容器 */
    max-width: 1200px; /* 最大宽度 */
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
    margin-bottom: 15px; /* 底部间距 */
    margin-top: 0; /* 去掉顶部默认间距 */
  }
  
  .progress-box p {
    font-size: 1em; /* 文字大小 */
    color: #333; /* 深灰色文字 */
  }
  </style>
  