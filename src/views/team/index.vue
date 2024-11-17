<script setup>
const tableData = ref([
      {
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      },
      {
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      }
    ])
</script>

<template>
  <div class="box">
    <div class="box-header">
      <span class="title">团队信息</span>
    </div>
    <div class="box-team">
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="150" />
    <el-table-column prop="group" label="组别" width="150" />
    <el-table-column prop="grade" label="年级" width="150" />
    <el-table-column prop="major" label="专业" width="180" />
    <el-table-column prop="present" label="现状" width="150" />
    <el-table-column prop="phone" label="联系方式" width="200" />
    <el-table-column label="操作" width="auto">
      <template #default="scope">
        <!-- 在这里添加你的自定义内容，比如按钮 -->
        <el-button type="text" @click="handleOperation(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</div> 
  </div>
</template>

<style scoped>
.box {
  width:100%;
  height:98%;
  margin:0px;
  padding:2%;
  background-color: #FFFFFF;
  border-radius: 1.5%;
}
.box-header {
  margin-bottom: 30px;
}
.title {
  font-size: 30px;
}

/*表格*/
.box-team{
  margin-left:3%;
}
</style>