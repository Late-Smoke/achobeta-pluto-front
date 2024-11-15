<script setup>
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();
const name = ref('1');

// 导航到个人中心
const navigateToPersonalCenter = () => {
  router.push({ name: 'PersonalCenter' });
};

// 退出登录
const handleLogout = () => {
  console.log('执行登出操作');
  router.push('/login');
};
/*
// 获取并赋值name 开发阶段保持注释，否则将无法正常显示下拉菜单
const fetchName = () => {
  const atoken = localStorage.getItem('atoken');//从本地获取atoken
  this.$get('https://api.example.com/data', { atoken })
  .then(response => {
    const data = response.data;
    name.value = data.username; // 获取并赋值name
  })
  .catch(error => {
    console.error(error);
  });}

  onMounted(fetchName);//挂载
  */
  
  const deviceDialogVisible = ref(false);

  const showDeviceDialog = () => {
      deviceDialogVisible.value = true; // 显示对话框
      console.log(deviceDialogVisible);
    }

  const gridData = ref([//测试数据
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]);


</script>

<template>
  <el-header class="header">
    <div v-if="name">
      
      <!-- 常用设备对话框 -->
      <el-dialog v-model="deviceDialogVisible" title="常用设备" width="800">
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>

    <el-dropdown class="header-right" trigger="hover" placement="bottom-end">
        <span class="el-dropdown-link" style="cursor: pointer;">
        <span>欢迎回来，{{ name }}</span>
        <el-icon>
          <ArrowDown style="font-size: 20px; color: white;" />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="navigateToPersonalCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click="showDeviceDialog">常用设备</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>

    </el-dropdown>
  </div>

  <div v-else>
        <span>加载中...</span><!--后期改为骨架屏-->
      </div>
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