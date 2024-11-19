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
const selectedTeam = ref('AchoBeta 1.0');
const dropdownItems = ref([
  { command: 'AchoBeta 1.0', label: 'AchoBeta 1.0' },
  { command: 'AchoBeta 2.0', label: 'AchoBeta 2.0' },
  { command: 'AchoBeta 3.0', label: 'AchoBeta 3.0' }
])
function handleCommand(command) {
  selectedTeam.value = command;
}
const teamEdit = ref('团队架构');


//const tableData = ref([]); // 所有数据
    const displayedData = ref([]); // 当前展示的数据
    const loading = ref(false); // 加载状态
    const allDataLoaded = ref(false); // 所有数据是否已加载完毕
    const currentPage = ref(1); // 当前页码
    const pageSize = 9; // 每页展示的数据条数
 
    // 模拟获取数据的方法
    const fetchData = async (page) => {
      loading.value = true;
      // 这里应该是异步请求数据，比如使用 axios 或 fetch
      // 但为了示例，我们使用 setTimeout 来模拟异步请求
      setTimeout(() => {
        const newData = [
          // ...（假设这里是新获取的数据，格式与 tableData 相同）
        ];
        tableData.value = [...tableData.value, ...newData];
        updateDisplayedData();
        loading.value = false;
        if (newData.length < pageSize) {
          allDataLoaded.value = true;
        }
      }, 1000); // 假设请求需要 1 秒
    };
 
    // 更新当前展示的数据
    const updateDisplayedData = () => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      displayedData.value = tableData.value.slice(start, end);
    };
 
    // 监听滚动事件，判断是否加载下一页数据
    const handleScroll = (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value && !allDataLoaded.value) {
        currentPage.value++;
        fetchData(currentPage.value);
      }
    };
 
    // 组件挂载时获取第一页数据
    onMounted(() => {
      fetchData(currentPage.value);
    });
</script>

<template>
  <div class="box">
    <div class="box-header">
      <span class="title">团队信息</span>
      <span class="currentTeam">当前团队：</span>
      <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ selectedTeam }}
        <el-icon class="el-icon--right">
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item 
            v-for="item in dropdownItems" 
            :key="item.command" 
            :command="item.command"
            :disabled="item.command === selectedTeam"
            :class="{ 'is-disabled': item.command === selectedTeam }">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="btn-group">
      <el-button type="info" plain class="btn1">
        <span class="btn-content">{{ teamEdit }}</span>
      </el-button>
      <el-button type="primary" plain class="btn2">
        <span class="btn-content">新增用户</span>
      </el-button>
    </div>
    </div>
    <div class="box-team">
  <el-table :data="tableData" height="500" stripe style="width: 100%" 
    @scroll="handleScroll" ref="table"  class="large-text-table">
    <el-table-column prop="name" label="姓名" width="150" />
    <el-table-column prop="group" label="组别" width="150" />
    <el-table-column prop="grade" label="年级" width="150" />
    <el-table-column prop="major" label="专业" width="200" />
    <el-table-column prop="present" label="现状" width="150" />
    <el-table-column prop="phone" label="联系方式" width="180" />
    <el-table-column label="操作" width="auto">
      <template #default="scope">
        <el-button type="text" @click="handleViewDetail(scope.row)">查看详情</el-button>
        <el-button type="text" @click="handleDelete(scope.row)" class="delete">
          <el-icon><DeleteFilled /></el-icon>
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="loading" class="loading-container">
    <el-icon class="loading-indicator"><Loading /></el-icon>
    <span>加载中...</span>
  </div>
  <div v-else-if="allDataLoaded" class="no-more-data">
    <span>没有更多数据了</span>
  </div>
</div> 
  </div>
</template>

<style scoped>
/*全局*/
.box {
  width:100%;
  height:98%;
  margin:0px;
  padding:2%;
  background-color: #FFFFFF;
  border-radius: 1.5%;
}

/*头部*/
.box-header {
  margin-bottom: 30px;
}
.title {
  font-size: 2.1em;
  font-weight: 500;
  margin-left: 20px;
}
.currentTeam {
  font-size: 1.5em;
  font-weight: 500;
  padding-left: 0.5em;
  margin-left: 1em;;
}
.el-dropdown-link {
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  margin-top: 14px;
}
.el-dropdown-menu__item.is-disabled {
  color: gray;
  cursor: not-allowed;
  pointer-events: none; /* 禁止点击 */
}
.el-dropdown-menu {
  transition: all 0.5s ease; /* 控制速度 */
}
.btn-group {
  float: right;
  margin-right: 20px;
  .btn1 , .btn2 {
    width: 120px;
    height: 50px;
    margin-left:40px;
  }
  .btn1:hover {
    border:solid 2px #1f0202;
  }
  .btn2:hover {
    border:solid 2px #005eff;
  }
  .btn-content {
  font-size: 20px;
}
}

/*表格*/
.box-team{
  margin-left:3%;
}
.delete {
  padding:5px;
}
.delete:hover {
  color: red; /* 鼠标悬浮时文本和图标颜色变为红色 */
}
.large-text-table {
  font-size: 18px; /* 调整为你想要的字体大小 */
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.loading-indicator {
  margin-right: 10px;
}
.no-more-data {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>