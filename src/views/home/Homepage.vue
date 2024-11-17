<template>
    <div class="homepage">
      <div class="top-row">
        <PointsBox />
        <MessagesBox />
      </div>
      <ProgressBox />
    </div>
  </template>
  
  <script setup>
  import PointsBox from './components/PointsBox.vue';
  import MessagesBox from './components/MessagesBox.vue';
  import ProgressBox from './components/ProgressBox.vue';
  </script>
  
  <style scoped>
  .homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
    width: 100%;
  }
  
  .top-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    gap: 20px;
  }
  </style>
  