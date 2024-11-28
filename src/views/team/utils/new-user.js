import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';

export const useNewUser = (router) => {
  const userLevel = ref(0); // 用户权限级别
  const formData = ref({
    name: '',
    sex: 'null',
    create_date: '',
    id_card: '',
    phone_num: '', // 必填
    email: '',
    grade: '',
    major: '',
    student_id: '',
    experience: '',
    status: '',
    member_position: [], // 团队及职位信息
  });

  // 用于跟踪表单是否被修改
  const isFormModified = ref(false);

  /**
   * 初始化用户信息，获取权限级别
   */
  const initializeNewUser = async (selectedTeamId) => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/team/power', {
        params: {
          atoken: localStorage.getItem('atoken'),
          team_id: selectedTeamId,
        },
      });

      if (response.data.code === 200) {
        const data = response.data.data;
        userLevel.value = data.level; // 设置用户权限级别

        // 初始化团队与职位信息
        formData.value.member_position = [
          {
            team_id: selectedTeamId,
            team_name: data.teams.find((team) => team.id === selectedTeamId)?.name || '未分配团队',
            position_node: [],
            level: 1, // 默认级别
          },
        ];
      } else {
        ElMessage.error('获取权限信息失败');
      }
    } catch (error) {
      console.error('Error fetching user power:', error);
      ElMessage.error('获取权限信息时发生错误');
    }
  };

  /**
   * 重置表单数据
   */
    const selectedTeamPosition = ref([]);
  const selectedRole = ref(0);
  const resetForm = () => {
    formData.value = {
      name: '',
      sex: 'null',
      create_date: '',
      id_card: '',
      phone_num: '',
      email: '',
      grade: '',
      major: '',
      student_id: '',
      experience: '',
      status: '',
      member_position: [], 
    };
    selectedTeamPosition.value = []; // 清空级联选择器选中值
    selectedRole.value = 0; // 重置管理权限
    isFormModified.value = false;
  };

  /**
   * 创建团队成员
   */
  const createTeamMember = async () => {
    if (!formData.value.phone_num) {
      ElMessage.warning('请填写手机号码');
      return false;
    }

    // 根据权限设置成员数据
  const memberData = {
    ...formData.value,
    member_position: userLevel.value === 3 ? selectedTeamPosition.value : [],
    role: userLevel.value === 3 ? selectedRole.value : undefined,
  };

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/team/memberlist/create', {
        ...memberData,
        atoken: localStorage.getItem('atoken'),
      });

      if (response.data.code === 200) {
        ElMessage.success('创建成员成功');
        isFormModified.value = false;
        return true;
      } else if (response.data.code === 403) {
        ElMessage.error('权限不足');
      } else {
        ElMessage.error('创建成员失败');
      }
    } catch (error) {
      console.error('Error creating team member:', error);
      ElMessage.error('创建成员时发生错误');
    }
    return false;
  };

  /**
   * 处理返回按钮点击事件
   */
  const handleBack = async () => {
    if (isFormModified.value) {
      try {
        const result = await ElMessageBox.confirm(
          '是否保存修改？',
          '提示',
          {
            confirmButtonText: '保存',
            cancelButtonText: '不保存',
            type: 'warning',
          }
        );

        if (result) {
          const success = await createTeamMember();
          if (success) {
            router.push('/team'); // 保存后跳转
          }
        } else {
            router.push('/team'); // 不保存直接跳转
        }
      } catch (error) {
        // 用户取消了弹窗
        router.push('/team');
      }
    } else {
        router.push('/team');
    }
  };

  /**
   * 标记表单为已修改
   */
  const updateFormModified = () => {
    isFormModified.value = true;
  };

  return {
    userLevel,
    formData,
    selectedTeamPosition, // 导出这些状态
    selectedRole,
    isFormModified,
    initializeNewUser,
    resetForm,
    createTeamMember,
    handleBack,
    updateFormModified,
  };
};


