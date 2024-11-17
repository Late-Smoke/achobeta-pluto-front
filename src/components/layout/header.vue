<script setup>
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { FetchName } from '@/components/layout/header'

const router = useRouter();
const name = ref('林浅');

// 导航到个人中心
const navigateToPersonalCenter = () => {
  router.push({ name: 'PersonalCenter' });
};

// 退出登录
const handleLogout = () => {
  console.log('执行登出操作');
  router.push('/login');
};

// 获取并赋值name 开发阶段保持注释，否则将无法正常显示下拉菜单
const atoken = localStorage.getItem('atoken');//从本地获取atoken
FetchName(atoken,response => {
    const data = response.data;
    name.value = data.username; // 获取并赋值name 
  })

  
//常用设备弹窗
const deviceDialogVisible = ref(false);

const showDeviceDialog = () => {
    deviceDialogVisible.value = true; // 显示对话框
    console.log(deviceDialogVisible);
  }
  
const gridData = ref([
    { name: '设备A', ip: '192.168.1.1', time: '2023-04-01 10:00:00' },
    { name: '设备B', ip: '192.168.1.2', time: '2023-04-01 10:30:00' },
    { name: '设备C', ip: '192.168.1.3', time: '2023-04-01 11:00:00' },
    { name: '设备D', ip: '192.168.1.4', time: '2023-04-01 11:30:00' },
    { name: '设备E', ip: '192.168.1.5', time: '2023-04-01 12:00:00' },
    { name: '设备F', ip: '192.168.1.6', time: '2023-04-01 12:30:00' },
    { name: '设备G', ip: '192.168.1.7', time: '2023-04-01 13:00:00' },
    { name: '设备H', ip: '192.168.1.8', time: '2023-04-01 13:30:00' },
    { name: '设备I', ip: '192.168.1.9', time: '2023-04-01 14:00:00' },
    { name: '设备J', ip: '192.168.1.10', time: '2023-04-01 14:30:00' }
  ]);

const totalDevices = 10; // 假设总共有10台设备
const pageSize = 3; // 开发阶段为3，后期更改为每页显示5台设备 
const currentPage = ref('1'); // 当前页码
const currentGridData = ref([]); // 当前页显示的设备数据

const currentName = ('设备A');

// 处理分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
  updateCurrentGridData();
}
// 更新当前页的设备数据
const updateCurrentGridData = () => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  currentGridData.value = gridData.value.slice(startIndex, endIndex);
}

// 处理下线操作
const handleOffline = (row) =>{
  // 下线逻辑
  console.log('下线设备:'+row.name);
}

  // 假设有一个方法用于从后端获取所有数据
  // fetchAllDevices() {
  //   // 发送请求获取数据，并更新gridData
  // }

  onMounted(async () => {
      // 取消注释以实际获取用户名字
      // await fetchName();
 
      try {
        //const devicesData = await fetchAllDevices(); // 获取设备数据
        //updateCurrentGridData(devicesData); // 更新网格数据
        updateCurrentGridData();
      } catch (error) {
        // 处理获取设备数据时发生的错误
        console.error('Failed to update grid data:', error);
      }
    });
</script>

<template>
  <el-header class="header">
    <div v-if="name">
      <!-- 常用设备对话框 -->
      <el-dialog v-model="deviceDialogVisible" title="常用设备" width="800">
        <span>此处将显示所有您开启了“三十天内自动登录”的设备</span>
        <hr>
      <el-table :data="currentGridData">
        <el-table-column property="name" label="设备名称" width="150" />
        <el-table-column property="ip" label="上次登录IP" width="200" />
        <el-table-column property="time" label="上次登录时间" />
        <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.name !== currentName"
            type="text"
            size="small"
            @click="handleOffline(scope.row)"
          >
            下线
          </el-button>
          <el-button
            v-else
            type="text"
            size="small"
            :disabled="true"
          >
            当前设备
          </el-button>
        </template>
      </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
      layout="prev, pager, next"
      :total="totalDevices"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
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