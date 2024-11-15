<script setup>
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();

// 导航到个人中心
const navigateToPersonalCenter = () => {
  router.push({ name: 'PersonalCenter' });
};

// 退出登录
const handleLogout = () => {
  console.log('执行登出操作');
  router.push('/login');
};
</script>

<template>
  <el-header class="header">
    <el-dropdown class="header-right" trigger="hover" placement="bottom-end">
      <span class="el-dropdown-link" style="cursor: pointer;">
        <span>欢迎回来，xxx</span>
        <el-icon>
          <ArrowDown style="font-size: 20px; color: white;" />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="navigateToPersonalCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #409eff;
  padding: 0 20px;
  height: 60px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
  padding: 10px;
  border-radius: 5px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
}
</style>
