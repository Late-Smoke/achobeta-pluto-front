<script setup>

</script>

<template>
<slot name="Progress">
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
</slot>
</template>

<style scoped>
.progress-details {
    font-size: 0;
    margin-left:80px;
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