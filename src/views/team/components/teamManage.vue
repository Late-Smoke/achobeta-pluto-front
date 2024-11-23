<script setup>
import { dropdownItems , teamManageVShow } from '@/views/team/index.vue'
</script>

<template>
  <el-dialog ref="teamManageVShow" title="团队架构管理" width="800" style="cursor: default">
    <span>此处将显示指定团队的架构”的设备</span>
    <hr>
    <el-dropdown class="downMenu" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ selectedTeamName }}
        <el-icon class="el-icon--right">
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in dropdownItems"
          :key="item.team_id"
          :class="{ 'is-disabled': item.team_id === selectedTeamId }"
          @click.stop="selectTeam(item)">
          <span>{{ item.team_name }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </el-dialog>
</template>

<style scoped>

</style>