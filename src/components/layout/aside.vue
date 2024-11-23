<script setup>
import {
  Odometer,
  SwitchButton,
} from '@element-plus/icons-vue';

const routers = [
  {
    path: '/',
    icon: Odometer,
    name: '一级菜单',
    children: [
      {
        path: '/dashboard',
        name: '公告板'
      },
      {
        path: '/hello',
        name: 'hello'
      }
    ]
  },
  {
    icon: SwitchButton,
    path: '/login',
    name: '登录'
  }
];

// 独立的主页和团队信息项
const additionalItems = [
  {
    path: '/home',
    name: '主页',
  },
  {
    path: '/team',
    name: '团队信息',
  }
];
</script>

<template v-slop="LayoutAside">
  <div class="container">
    <el-menu class="menu" default-active="1">
      <template v-for="item in routers" :key="item.path">
        <!-- 二级路由 -->
        <el-sub-menu
          v-if="item.children"
          :index="item.path"
        >
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <router-link
            v-for="child in item.children"
            :key="child.path"
            :to="child.path"
          >
            <el-menu-item :index="child.path">
              {{ child.name }}
            </el-menu-item>
          </router-link>
        </el-sub-menu>

        <!-- 一级路由 -->
        <router-link
          v-else
          :key="item.path"
          :to="item.path"
        >
          <el-menu-item :index="item.path">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </router-link>
      </template>

      <!-- 独立的“主页”和“团队信息”项 -->
      <template v-for="item in additionalItems" :key="item.path">
        <router-link :to="item.path">
          <el-menu-item :index="item.path">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </router-link>
      </template>
      
    </el-menu>
  </div>
</template>


<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh; /* 占满视口高度 */
  background-color: #99c4f0; /* 蓝色背景 */
  overflow: hidden; /* 防止全局滚动 */
  position: relative; /* 确保子元素的定位以此为基准 */
}

/* 菜单样式 */
.menu {
  position: fixed; /* 固定菜单 */
  top: 60px; /* 确保不与 header 重叠 */
  left: 0;
  width: 200px; /* 固定宽度 */
  height: calc(100vh - 60px); /* 剩余高度 */
  background-color: #ffffff;
  overflow-y: auto; /* 当内容超出时滚动 */
  z-index: 1000; /* 确保菜单在 container 之上，但不会完全遮盖 */
  background-color: transparent; /* 透明背景，让蓝色背景可见 */
  border-right: 1px solid #ddd; /* 分割线 */
}

/* 菜单按钮样式 */
.menu .el-menu-item {
  background-color: #ffffff !important; /* 按钮背景为白色 */
  color: #000000 !important; /* 按钮文字为黑色 */
}

.menu .el-menu-item:hover,
.menu .el-menu-item.is-active {
  background-color: #e6f7ff !important; /* 鼠标悬浮或激活时背景色 */
  color: #409eff !important; /* 鼠标悬浮时文字颜色 */
}
</style>
