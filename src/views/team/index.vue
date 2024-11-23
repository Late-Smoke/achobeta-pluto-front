<script setup>
import { getPowerApi, deleteTeamMemberApi, CreateTeamApi ,getTeamMemberListApi } from '@/utils/api/teamInformation.ts'
import { useRouter } from 'vue-router';
const router = useRouter();

// 跳转到新增用户页面
const handleAddUser = (id, selectedTeamId) => {
  router.push('/team/new-user'); // 跳转到新增用户页面的路由
};

const handleViewDetail = (id, selectedTeamId) => {
  router.push(`/team/detail/${id}`); // 跳转到带有用户ID的详情页
};

//团队架构查看和管理跳转
const teamManageVShow = ref(false);
const handleTeamManage = () => {
  teamManageVShow.value = true;
}

//需要后端传的时候加上指定团队成员信息数组的长度 所有关于allData长度的都要修改为allDataLength
//const allDataLength = ref('');
const allData = ref([
      {
        id:1,
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        id:2,
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        id:3,
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        id:4,
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        id:5,
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      },
      {
        id:6,
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        id:7,
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        id:8,
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        id:9,
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        id:10,
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      },
      {
        id:11,
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        id:12,
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        id:13,
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        id:14,
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        id:15,
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      },
      {
        id:16,
        name: '张三',
        group: 'A组',
        grade: '大二',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000001'
      },
      {
        id:17,
        name: '李四',
        group: 'B组',
        grade: '大三',
        major: '软件工程',
        present: '实习',
        phone: '13800000002'
      },
      {
        id:18,
        name: '王五',
        group: 'C组',
        grade: '大四',
        major: '信息安全',
        present: '毕业',
        phone: '13800000003'
      },
      {
        id:19,
        name: '赵六',
        group: 'D组',
        grade: '研究生',
        major: '人工智能',
        present: '在读',
        phone: '13800000004'
      },
      {
        id:20,
        name: '孙七',
        group: 'E组',
        grade: '博士生',
        major: '计算机科学与技术',
        present: '在读',
        phone: '13800000005'
      }
    ]);
const tableData = ref([]);
const loading = ref(false);
const pageSize = 9; // 每次加载的数据量
let currentPage = 1;
 
const noMore = computed(() => currentPage * pageSize >= allData.value.length);
 
const loadMore = () => {
  if (loading.value || noMore.value) return;
  loading.value = true;
  async() => {
    const response = await getTeamMemberListApi({selectedTeamId, currentPage , pageSize});
    tableData.value = response.members;
    currentPage++;
    loading.value = false;
  }
};
loadMore();

//下拉框
const selectedTeamId = ref(0);
const selectedTeamName = ref('第一个团队名称');
const dropdownItems = ref([
  { team_id: 0, team_name: '第一个团队名称' },
  { team_id: 1, team_name: 'AchoBeta 1.0'},
  { team_id: 2, team_name: 'AchoBeta 2.0'},
  { team_id: 3, team_name: 'AchoBeta 3.0'}
]);
const teamName = ref('');
const showAddTeam = ref(true);
const hoverItem = ref(null);
//团队信息
const first_teamid = ref(0);
const first_team_name = ref('第一个团队名称');
const ifCreateTeam = ref(false);

const selectTeam = (item) => {
  if (!item.isDisabled) {
    selectedTeamId.value = item.team_id;
    selectedTeamName.value = item.team_name;
    // 禁用已选择的团队
    dropdownItems.value = dropdownItems.value.map(i =>
      i.team_id === item.team_id ? { ...i, isDisabled: true } : { ...i, isDisabled: false }
    );
    // 隐藏输入框，显示下拉菜单项
    showAddTeam.value = true;
    currentPage = 1;
  }
};

const toggleAddTeam = () => {
  showAddTeam.value = !showAddTeam.value;
  if (!showAddTeam.value) {
    // 聚焦到输入框
    nextTick(() => {
      if (this.$refs.teamInput) {
        this.$refs.teamInput.focus();
      }
    });
  }
};

const addTeam = () => {
  if (teamName.value.trim()) {
    const newTeam = { team_id: dropdownItems.value.length, team_name: teamName.value};
    dropdownItems.value.push(newTeam);
    selectedTeamId.value = newTeam.team_id;
    selectedTeamName.value = newTeam.team_name;
    toggleAddTeam(); // 隐藏输入框，显示下拉菜单项
    teamName.value = ''; // 清空输入框
    const response = CreateTeamApi({teamName});
    if(response.message == "成功") ifCreateTeam.value = true;
  }
};
//删除
const ifDelete = ref(false);
function showDelete(id) {
  ElMessageBox.confirm(
    '是否确认删除此团队成员？',
    '提示',
    {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }
  ).then((confirm) => {
    if (confirm) {
      handleDelete(id);
      console.log("用户点击了确认，准备删除ID为", id, "的成员");
    } else {
      ElMessage({
      message: '已取消删除。',
      type: 'warning'
    }),
      console.log("用户点击了取消");
    }
  }).catch((error) => {
    ElMessage.error('出错了！'),
    console.error("显示消息框时发生错误:", error);
    // 处理显示消息框过程中可能出现的错误
  });
}
function handleDelete(id){
  console.log("执行了接口");
  const response = deleteTeamMemberApi({id,selectedTeamId});
  if(response.message == '删除成功') ifDelete.value = true;
}

//权限组
const urls = ref([1]);//测试期间为[1]
const teamStrManage = true;
const deleteMember = true;
const addMember = true; 
//为测试，将一下注掉，统一设为true
// const TeamStrManage = computed(() => urls.value.includes("/api/team/structure/collection"));//团队架构管理
// const deleteMember = computed(() => urls.value.includes("/api/team/memberlist/delete"));//删除团队成员
// const addMember = computed(() => urls.value.includes("/api/team/memberlist/create"));//新增团队成员

//团队架构
const teamStructure = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

onMounted(async() =>{
  try {
        const atoken = localStorage.getItem('atoken');
        if (!atoken) {
          ElMessage.error('未找到认证令牌。');
          return; // 如果没有令牌，则不继续执行
        }

        const responseFirst = await getPowerApi({atoken});
        first_teamid.value = responseFirst.data.first_teamid;
        first_team_name.value = responseFirst.data.first_team_name;
        selectedTeamId.value = first_teamid;
        selectedTeamName.value = first_team_name;//优先显示用户第一个团队的信息
 
        const responseScecond = await getPowerApi({atoken , first_teamid});
        urls.value = responseScecond.data.urls;
        dropdownItems.value = responseScecond.data.teams;
        level.value = responseScecond.data.level;

        loadMore();
      } catch (error) {
        ElMessage.error('数据获取失败。');
        console.error('Error fetching data:', error);
      }
})
</script>

<template>
  <el-dialog v-model="teamManageVShow" width="800" style="cursor: default " center >
    <template #title>
      <div class="custom-title">
        <el-icon><Tools /></el-icon>
        团队架构管理
      </div>
    </template>
    <span>此处将显示指定团队的架构”的设备</span>
    <hr>
    <!--团队下拉框-->
    <div class="header">
    <span class="teamTitle" style="cursor: default">当前团队：</span>
    <el-dropdown class="teamDownMenu" @command="handleCommand">
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
            @click.stop="selectTeam(item)"
            @mouseenter="hoverItem = item"
            @mouseleave="hoverItem = null">
            <span>{{ item.team_name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

    <!--团队架构-->
    <div class="container">
    <el-cascader-panel :options="teamStructure">
    <template #default="{ node, data}">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }})</span>
    </template>
</el-cascader-panel>
  </div>
  </el-dialog>


  <div class="box">
    <div class="box-header">
      <span class="title" style="cursor: default">团队信息</span>
      <span class="currentTeam" style="cursor: default">当前团队：</span>
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
            @click.stop="selectTeam(item)"
            @mouseenter="hoverItem = item"
            @mouseleave="hoverItem = null">
            <span>{{ item.team_name }}</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="showAddTeam" @click="toggleAddTeam">
            <span>新增团队</span>
          </el-dropdown-item>
          <el-input
            v-else
            v-model="teamName"
            style="width: 120px; margin-left: 5px;"
            placeholder="请输入团队名称"
            @keyup.enter="addTeam"
            ref="teamInput"
          />
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div v-if="urls.length!=0" class="btn-group">
      <el-button type="info" plain class="btn1">
        <span v-if="teamStrManage" class="btn-content" @click="handleTeamManage">团队架构管理</span>
        <span v-else class="btn-content" @click="handleTeamView">团队架构查看</span>
      </el-button>
      <el-button v-if="addMember" type="primary" plain class="btn2" @click="handleAddUser(id, selectedTeamId)">
        <span class="btn-content">新增用户</span>
      </el-button>
    </div>
    </div>
    <div class="box-team" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading || noMore" infinite-scroll-distance="10" style="cursor: default">
      <el-table :data="allData" stripe style="width: 100%"  height="550px" class="large-text-table">
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="group" label="组别"/>
          <el-table-column prop="grade" label="年级"/>
          <el-table-column prop="major" label="专业"/>
          <el-table-column prop="present" label="现状"/>
          <el-table-column prop="phone" label="联系方式"/>
          <el-table-column label="操作" width="auto">
            <template v-slot="scope">
              <el-button type="text" @click="handleViewDetail(scope.row.id, selectedTeamId)">查看详情</el-button>
              <el-button v-if="deleteMember" type="text" @click="showDelete(scope.row.id)" class="delete">
                <el-icon><DeleteFilled /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <p v-if="loading">Loading...</p>
      <p v-if="noMore">No more data</p>
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
.el-dropdown-link:hover {
  border: none !important; /* 取消边框 */
  outline: none !important; /* 取消轮廓线 */
}
.el-dropdown-link {
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  margin-top: 14px;
  border: none !important; /* 取消边框 */
  outline: none !important; /* 取消轮廓线 */
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
}
.btn1 , .btn2{
  padding: 25px;
  margin-left:40px;
}
.btn1:hover {
    border:solid 1.5px #1f0202;
}
.btn2:hover {
  border:solid 1.5px #005eff;
}
.btn-content {
font-size: 20px;
}

/*表格*/
.box-team{
  margin-left:3%;
}
.delete {
  padding:5px;
}
.delete:hover {
  color: red; 
}
.large-text-table {
  font-size: 18px; 
}
.large-text-table .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: red; /* 滚动条轨道的颜色 */
}
p {
    text-align: center;
    margin: 20px 0;
    font-size: 16px;
}


/*团队架构管理*/
.teamDialog .el-dialog__wrapper{
  min-height:500px !important;
}
.header {
  display:flex;
  width:100%;
  margin:0px;
}
.custom-title {
  font-size: 2em;
  font-weight: 600px;
}
.teamTitle {
  align-content: center;
  font-weight: 500;
  color:#000000;
  font-size: 1.5em;
  padding-top:15px;
  margin-left:20px;
}
.teamDownMenu {
  align-content: center;
}
.container {
  margin:20px;
}
</style>