<script setup>
import { getPowerApi, deleteTeamMemberApi, CreateTeamApi ,getTeamMemberListApi, getTeamStructureApi, putTeamNodeApi } from '@/axios/api/teamInformation.ts'
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
const router = useRouter();

// 跳转到新增用户页面
const handleAddUser = (selectedTeamId,selectedTeamName) => {
  router.push({
    path: `/team/new-user/${selectedTeamId}/${selectedTeamName}`,
  }); // 跳转到新增用户页面的路由
};

const handleViewDetail = (id, selectedTeamId,level) => {
  router.push(`/team/detail/${id}`); // 跳转到带有用户ID的详情页
};

//需要后端传的时候加上指定团队成员信息数组的长度 所有关于allData长度的都要修改为allDataLength
//const allDataLength = ref('');
let currentData = ref([
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
const pageSize = 10; // 每页显示的数据条数
let currentPage = ref(1);//当前页面
let totalPages = ref(1);//总数据条数

const handlePageChange = (page) => {
  currentPage.value = page;
  updateCurrentData();
}

const updateCurrentData = async() => {
  try{
    const response = await getTeamMemberListApi({team_id:selectedTeamId.value,page:currentPage.value,perpage:pageSize});
    console.log('传入的team_id为:',selectedTeamId.value);
    console.log('更新团队成员列表-后端响应内容:', response.data); // 打印后端响应内容 
      currentData.value = response.data.data.members;
      totalPages.value = response.data.data.members.length;}
  catch(error){
    ElMessage.error('成员信息获取失败。');
    console.error('Error fetching teamMembers:', error);
}}
 
// const noMore = computed(() => currentPage * pageSize >= allData.value.length);
 
// const loadMore = () => {
//   if (loading.value || noMore.value) return;
//   loading.value = true;
//   async() => {
//     const response = await getTeamMemberListApi({selectedTeamId, currentPage , pageSize});
//     tableData.value = response.members;
//     currentPage++;
//     loading.value = false;
//   }
// };
// loadMore();

//下拉框
let selectedTeamId = ref(1);
let selectedTeamName = ref('AchoBeta 1.0');
let dropdownItems = ref([
  { id: 1, name: 'AchoBeta 1.0'},
  { id: 2, name: 'AchoBeta 2.0'},
  { id: 3, name: 'AchoBeta 3.0'}
]);
let teamName = ref('');
let showAddTeam = ref(true);
let hoverItem = ref(null);
//团队信息
let first_teamid = ref(1);
let first_team_name = ref('AchoBeta 1.0');
let ifCreateTeam = ref(false);

const selectTeam = (item) => {
  if (!item.isDisabled) {
    selectedTeamId.value = item.id;
    selectedTeamName.value = item.name;
    currentPage.value = 1;
    updateCurrentData();
    // 禁用已选择的团队
    dropdownItems.value = dropdownItems.value.map(i =>
      i.id === item.id ? { ...i, isDisabled: true } : { ...i, isDisabled: false }
    );
    // 隐藏输入框，显示下拉菜单项
    showAddTeam.value = true;
    currentPage.value = 1;
  }
};

const toggleAddTeam = () => {
  showAddTeam.value = !showAddTeam.value;
  // if (!showAddTeam.value) {
  //   // 聚焦到输入框
  //   nextTick(() => {
  //     if (this.$refs.teamInput) {
  //       this.$refs.teamInput.focus();
  //     }
  //   });
  // }
};

const addTeam = async() => {
  try{
    if (teamName.value) {
      console.log("teamName.value:",teamName.value);
    const response = await CreateTeamApi({team_name:teamName});
    console.log("后端响应为："+response.data);
    const teamId = response.data.data.id;
    const newTeam = { id: teamId, name: teamName.value};
    dropdownItems.value.push(newTeam);
    selectedTeamId.value = newTeam.id;
    selectedTeamName.value = newTeam.name;
    toggleAddTeam(); // 隐藏输入框，显示下拉菜单项
    teamName.value = ''; // 清空输入框
    ifCreateTeam.value = true;
  }
}
  catch(error){
    ElMessage.error('团队新增失败。');
    console.error('Error adding new team:', error);
}}
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
  ).then(() => {
    //调用接口
    handleDelete(id);
    ElMessage({
        type: 'success',
        message: '已成功删除',
      })
  }).catch(() => {
    ElMessage({
      message: '已取消删除。',
      type: 'warning'
    })
  });
}
function handleDelete(id){
  console.log("执行了接口");
  const response = deleteTeamMemberApi({id,selectedTeamId});
  if(response.message == '删除成功') ifDelete.value = true;
}

//团队架构查看和管理跳转
const teamManageOptionShow = ref(false);//团队架构管理
const team_structures = ref([
  {
    "team_id": 1859771705543626752,
    "myself_id": 1859771706189549568,
    "father_id": 1,
    "node_name": "根节点",
    "is_deleted": 0
  },
{
    "team_id": 1859771705543626752,
    "myself_id": 5,
    "father_id": 1859771706189549568,
    "node_name": "测试设计组",//如何做到当名字过长不出错
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 1.1,
    "father_id": 5,
    "node_name": "设计组",
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 1.11,
    "father_id": 1.1,
    "node_name": "设计组的小弟",
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 2.1,
    "father_id": 2,
    "node_name": "财务组",
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 2,
    "father_id": 1859771706189549568,
    "node_name": "测试财务组",
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 3,
    "father_id": 1859771706189549568,
    "node_name": "测试研发组",
    "is_deleted": 0
},
{
    "team_id": 1859771705543626752,
    "myself_id": 4,
    "father_id": 1859771706189549568,
    "node_name": "团队负责人",
    "is_deleted": 0
}
]);
const OldTeam_structures = ref(team_structures);//旧团队架构管理
const handleTeamManage = async() => {
  try{
    teamManageOptionShow.value = true;
    const response = await getTeamStructureApi({team_id:selectedTeamId.value});
    console.log("后端响应为：",response.data);
    if(response.data.code === -20000) ElMessage.error('登录已过期，请重新登陆！');
    else{
      first_teamid.value = 1;
      first_team_name.value = 'AchoBeta 1.0';
      ifCreateTeam.value = false;
      team_structures.value = response.data.data.team_structures;
      OldTeam_structures.value = response.data.data.team_structures;//备用
    }
}
  catch(error){
    ElMessage.error('团队架构获取失败。');
    console.error('Error fetching teamStructures:', error);
}}

//权限组
let urls = ref([]);
let level = ref(1);
let addNewTeam = ref(false);
let TeamStrManage = ref(false);
let deleteMember = ref(false);
let addMember = ref(false);

// const addNewTeam = computed(() => urls.value.includes("/api/team/memberlist/create")); //新增团队
// const TeamStrManage = computed(() => urls.value.includes("/api/team/structure/collection"));//团队架构管理
// const deleteMember = computed(() => urls.value.includes("/api/team/memberlist/delete"));//删除团队成员
// const addMember = computed(() => urls.value.includes("/api/team/memberlist/create"));//新增团队成员

//团队架构
// const team_structures = ref([
// {
//     "team_id": 1859771705543626752,
//     "myself_id": 1859871969764184064,
//     "father_id": 1859771706189549568,
//     "node_name": "测试设计组",
//     "is_deleted": 0
// },
// {
//     "team_id": 1859771705543626752,
//     "myself_id": 1859871970129088512,
//     "father_id": 1859771706189549568,
//     "node_name": "测试财务组",
//     "is_deleted": 0
// },
// {
//     "team_id": 1859771705543626752,
//     "myself_id": 1859871970519158784,
//     "father_id": 1859771706189549568,
//     "node_name": "测试研发组",
//     "is_deleted": 0
// },
// {
//     "team_id": 1859771705543626752,
//     "myself_id": 1859871970892451840,
//     "father_id": 1859771706189549568,
//     "node_name": "测试团队负责人",
//     "is_deleted": 0
// }
// ]);
const root_id = team_structures.value.find(node => node.father_id === 1)?.myself_id;//根节点id
const showLevel2 = ref(false);//展示目录面
const showLevel3 = ref(false);
const showLevel4 = ref(false);
const level1 = ref(root_id);//筛选对应级目录
const level2 = ref(null);
const level3 = ref(null);
const level4 = ref(null);
const showInput1 = ref(false);//展示输入框
const showInput2 = ref(false);
const showInput3 = ref(false);
const showInput4 = ref(false);
function show2Node(node){
  showLevel2.value = true;
  showLevel3.value = false;
  showLevel4.value = false;
  level2.value = node.myself_id;
  level3.value = null;
  level4.value = null;
}
function show3Node(node){
  showLevel2.value = true;
  showLevel3.value = true;
  showLevel4.value = false;
  level3.value = node.myself_id;
  level4.value = null;
}
function show4Node(node){
  showLevel2.value = true;
  showLevel3.value = true;
  showLevel4.value = faTruckMedical;
  level4.value = node.myself_id;
}
function handleNodeAdd(input){//新增按钮和输入框间的切换
  switch(input){
    case 'input1':
      showInput1.value = !showInput1.value;
      break;
    case 'input2':
      showInput2.value = !showInput2.value;
      break;
    case 'input3':
      showInput3.value = !showInput3.value;
      break;
    case 'input4':
      showInput4.value = !showInput4.value;
      break;
  }
  //showInput.value = !showInput.value;
}
const inputNodeName = ref('');
const changeTeam = ref([]);
function inputNode(level,input) {//新增
  if(inputNodeName.value){
    const teamId = team_structures.value.find(node => node.myself_id === level)?.team_id;
    const newTeam1 = {
      team_id: teamId,
      myself_id:Date.now(),
      father_id: level,
      node_name: inputNodeName.value,
      is_deleted: 0
    };
    const newTeam2 = {
      team_id: teamId,
      father_id: level,
      node_name: inputNodeName.value,
      is_deleted: 0
    };
    team_structures.value.push(newTeam1);
    changeTeam.value.push(newTeam2);
    handleNodeAdd(input);
    inputNodeName.value = '';
  }
}
function showNodeDelete(node,input) {//删除
  ElMessageBox.confirm(//弹窗
    '是否确认删除此团队架构？',
    '提示',
    {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }
  ).then(() => {
    const newTeam = {
      team_id: node.team_id,
      father_id: node.father_id,
      node_name: node.node_name,
      is_deleted: 1
    };
    changeTeam.value.push(newTeam);
    node.is_deleted = 1;
    updateFatherIds(node);
    switch(input){
      case 'input1':
      showLevel2.value = false;
      showLevel3.value = false;
      showLevel4.value = false;
        break;
      case 'input2':
      show2Node(node);
        break;
      case 'input3':
      show3Node(node);
        break;
      case 'input4':
      show4Node(node);
        break;
    }
    ElMessage({//提示弹窗
        type: 'success',
        message: '已成功删除',
      })
  }).catch(() => {
    ElMessage({//提示弹窗
      message: '已取消删除。',
      type: 'warning'
    })
  });
}
function updateFatherIds(node) {//更新
  team_structures.value.forEach(team => {
    if (team.father_id === node.myself_id) {
      team.father_id = node.father_id;
    }
  });
}
function resetTeam(){//重置
  team_structures.value = OldTeam_structures.value;
}
const saveTeam = async() => {//保存
try{
  const response = await putTeamNodeApi({team_id:selectedTeamId,team_structures:changeTeam});
  console.log("后端响应为："+response.data);
  ElMessage({
    type:'success',
    message: '已成功保存',
  })
}
catch(error){
  ElMessage.error('团队架构保存失败。')
  console.error('Failed to update grid data:', error);
}}

onMounted(async() =>{
  await getPowerApi({team_id:0})//获取第一个团队id
    .then(data => {
        console.log('获取第一个团队id-后端响应:',data.data);
        if(data.data.code === -20000) ElMessage.error('登录已过期，请重新登陆！');
        else{
          first_teamid.value = data.data.data.first_teamid;
          first_team_name.value = data.data.data.first_team_name;
          selectedTeamId.value = first_teamid.value;
          selectedTeamName.value = first_team_name.value;//优先显示用户第一个团队的信息
        }
  })
  .catch(error => {
    ElMessage.error('数据获取失败。');
    console.error('Error fetching data:', error);
  });
  await getPowerApi({team_id:first_teamid.value})//获取权限组和团队列表
  .then(data => {
    console.log('获取权限组和团队列表-后端响应:', data.data);
    urls.value = data.data.data.urls;
    dropdownItems.value = data.data.data.teams;
    level.value = data.data.level;
    addNewTeam = computed(() => urls.value.includes("/api/team/memberlist/create")); //新增团队
    TeamStrManage = computed(() => urls.value.includes("/api/team/structure/collection"));//团队架构管理
    deleteMember = computed(() => urls.value.includes("/api/team/memberlist/delete"));//删除团队成员
    addMember = computed(() => urls.value.includes("/api/team/memberlist/create"));//新增团队成员
    updateCurrentData();
  })
  .catch(error => {
    ElMessage.error('成员列表数据获取失败。');
    console.error('Error fetching data:', error);
  });
})
</script>

<template>
  <!--团队架构管理-->
  <el-dialog v-model="teamManageOptionShow" width="800" style="cursor: default " center >
    <template #title>
      <div class="custom-title">
        <el-icon><Tools /></el-icon>
        团队架构管理
      </div>
    </template>
    <span>此处将显示指定团队的架构</span>
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
            :key="item.id"
            :class="{ 'is-disabled': item.id === selectedTeamId }"
            @click.stop="selectTeam(item)"
            @mouseenter="hoverItem = item"
            @mouseleave="hoverItem = null">
            <span>{{ item.name }}</span>
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
          />
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
    <!--团队架构-->
  <div class="bigBox">
    <div class="smallBox first">
      <div v-for="node in team_structures" :key="node.myself_id">
        <div v-if="node.father_id == level1 && level1!=null && !node.is_deleted" class="nodeBox">
            <el-button text @click="show2Node(node)" class="nodeTitle">
                <span>{{ node.node_name }}</span>
            </el-button>
            <el-button text class="nodeDelete" @click="showNodeDelete(node,'input1')"><el-icon><Delete /></el-icon></el-button>
        </div>
      </div>
      <div v-if="showInput1" class="inputBox">
        <el-input
        v-model="inputNodeName"
        placeholder="请输入分组/职位名"
        @keyup.enter="inputNode(level1,'input1')"
        @blur="handleNodeAdd('input1')"
      />
      </div>
      <el-button v-else text class="nodeAdd" @click="handleNodeAdd('input1')">
        新增分组/职位
        <el-icon class="nodeAddIcon"><Plus /></el-icon>
      </el-button>
    </div>
    <div v-if="showLevel2" class="smallBox second">
      <div v-for="node in team_structures" :key="node.myself_id">
        <div v-if="node.father_id == level2 && level2!=null &&!node.is_deleted" class="nodeBox">
            <el-button text @click="show3Node(node)" class="nodeTitle">
                <span>{{ node.node_name }}</span>
            </el-button>
            <el-button text class="nodeDelete" @click="showNodeDelete(node,'input2')"><el-icon><Delete /></el-icon></el-button>
        </div>
      </div>
      <div v-if="showInput2" class="inputBox">
        <el-input
        v-model="inputNodeName"
        placeholder="请输入分组/职位名"
        @keyup.enter="inputNode(level2,'input2')"
        @blur="handleNodeAdd('input2')"
      />
      </div>
      <el-button v-else-if="level2||(!level2&&level1)" text class="nodeAdd" @click="handleNodeAdd('input2')">
        新增分组/职位
        <el-icon class="nodeAddIcon"><Plus /></el-icon>
      </el-button>
    </div>
    <div v-if="showLevel3" class="smallBox third">
      <div v-for="node in team_structures" :key="node.myself_id" @click="show4Node(node)">
        <div v-if="node.father_id == level3 && level3!=null &&!node.is_deleted" class="nodeBox">
            <el-button text @click="show4Node(node)" class="nodeTitle">
                <span>{{ node.node_name }}</span>
            </el-button>
            <el-button text class="nodeDelete" @click="showNodeDelete(node,'input3')"><el-icon><Delete /></el-icon></el-button>
        </div>
      </div>
      <div v-if="showInput3" class="inputBox">
        <el-input
        v-model="inputNodeName"
        placeholder="请输入分组/职位名"
        @keyup.enter="inputNode(level3,'input3')"
        @blur="handleNodeAdd('input3')"
      />
      </div>
      <el-button v-else-if="level3||(!level3&&level2)" text class="nodeAdd" @click="handleNodeAdd('input3')">
        新增分组/职位
        <el-icon class="nodeAddIcon"><Plus /></el-icon>
      </el-button>
    </div>
    <div v-if="showLevel4" class="smallBox forth">
      <div v-for="node in team_structures" :key="node.myself_id">
        <div v-if="node.father_id == level4 && level4!=null &&!node.is_deleted" class="nodeBox">
            <el-button text class="nodeTitle">
                <span>{{ node.node_name }}</span>
            </el-button>
            <el-button text class="nodeDelete" @click="showNodeDelete(node,'input4')"><el-icon><Delete /></el-icon></el-button>
        </div>
      </div>
      <div v-if="showInput4" class="inputBox">
        <el-input
        v-model="inputNodeName"
        placeholder="请输入分组/职位名"
        @keyup.enter="inputNode(level4,'input4')"
        @blur="handleNodeAdd('input4')"
      />
      </div>
      <el-button v-else-if="level4||(!level4&&level3)" text class="nodeAdd" @click="handleNodeAdd('input4')">
        新增分组/职位
        <el-icon class="nodeAddIcon"><Plus /></el-icon>
      </el-button>
    </div>
  </div>
  <!--重置 保存按钮-->
  <template #footer>
      <div class="buttonBox">
        <el-button class="reset" @click="resetTeam">重置</el-button>
        <el-button type="primary" class="save" @click="saveTeam">保存</el-button>
      </div>
    </template>

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
            :key="item.id"
            :class="{ 'is-disabled': item.id === selectedTeamId }"
            @click.stop="selectTeam(item)"
            @mouseenter="hoverItem = item"
            @mouseleave="hoverItem = null">
            <span>{{ item.name }}</span>
          </el-dropdown-item>
          <div v-if="addNewTeam">
            <el-dropdown-item v-if="showAddTeam" @click="toggleAddTeam">
            <span>新增团队</span>
          </el-dropdown-item>
          <el-input
            v-else
            v-model="teamName"
            style="width: 120px; margin-left: 5px;"
            placeholder="请输入团队名称"
            @keyup.enter="addTeam"
          />
          </div>

        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div v-if="urls!=0" class="btn-group">
      <el-button v-if="TeamStrManage" type="info" plain class="btn1">
        <span class="btn-content" @click="handleTeamManage()">团队架构管理</span>
      </el-button>
      <el-button v-if="addMember" type="primary" plain class="btn2" @click="handleAddUser(selectedTeamId,selectedTeamName,level)">
        <span class="btn-content">新增用户</span>
      </el-button>
    </div>
    </div>
    <div class="box-team" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading || noMore" infinite-scroll-distance="10" style="cursor: default">
      <el-table :data="currentData" stripe style="width: 100%"  height="550px" class="large-text-table">
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
      <!--分页-->
      <el-pagination
      layout="prev, pager, next"
      :total="totalPages"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
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
  color: rgb(228, 0, 0); 
}
.large-text-table {
  font-size: 18px; 
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
  display: flex;
  align-items: center;
  justify-content: center;
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

.bigBox {
  margin:20px;
  display: flex;
  height: auto;
  overflow: auto;
}
.bigBox::-webkit-scrollbar {
  width: 4px;
}
.bigBox::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}
.smallBox {
  height:400px;
  border:solid 2px #656161;
  padding-top:10px;
}
.smallBox * {
  text-align: left;
}
.nodeBox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nodeDelete {
  float: right;
  color: rgb(228, 0, 0);
}

.nodeTitle {
  width:120px;
  justify-content: space-between;
  color:#000000;
}
.nodeAdd {
  margin-left:10px;
}
.inputBox {
  width: 150px;
  margin-left:20px;
}
.nodeAddIcon{
  margin-left:18px;
}
.nodeAdd , .nodeTitle{
  height: 40px; 
  font-size: 18px;
}

/*按钮*/
.buttonBox {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 15px;
  padding-right: 20px;
}


</style>