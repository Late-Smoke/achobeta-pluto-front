import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';

export const useNewUser = (router) => {
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

  // 级联选择器相关变量
  const selectedTeamPosition = ref([]);
  const selectedRole = ref(0);

  // 用于跟踪表单是否被修改
  const isFormModified = ref(false);

  /**
   * 初始化用户信息
   */
  const initializeNewUser = async (selectedTeamId,selectedTeamName) => {
    formData.value.member_position = [
      {
        team_id: 824567004096,//写死团队id先,后面改为selectedTeamId
        team_name: selectedTeamName || '未知团队', // 从外部传入团队名称
        position_node: [],
      },
    ];
  };

    /**
   * 重置表单数据
   */
  const resetForm = async (selectedTeamId, selectedTeamName) => {
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

    // 重新初始化团队信息
    await initializeNewUser(selectedTeamId, selectedTeamName);
  };

  /**
   * 验证表单字段
   */
  const validateForm = () => {
    if (!formData.value.phone_num) {
      ElMessage.warning('请填写手机号码');
      return false;
    }
    return true;
  };

  /**
   * 创建团队成员
   */
  const createTeamMember = async () => {
    if (!validateForm()) return false;

    const atoken = localStorage.getItem('atoken');
    console.log(atoken)
    if (!atoken) {
      ElMessage.error('未检测到登录信息，请重新登录');
      return false;
    }

    // 同步级联选择器值到表单
    formData.value.member_position = selectedTeamPosition.value.map((item) => ({
      team_id: item.team_id,
      team_name: item.team_name,
      position_node: item.position_node || [],
      level: item.level || 1,
    }));

     // 打印用户输入的参数
  console.log('用户输入的参数:', {
    ...formData.value,
    role: selectedRole.value,
  });
  
    try {
      const response = await axios.post(
        '/api/team/memberlist/create',
        {
          ...formData.value,
          role: selectedRole.value,
        },
        {
          headers: {
            Authorization: `${atoken}`, 
          },
        }
      );

      console.log('新增用户保存',response)
      if (response.data.code === 20000) {
        ElMessage.success('创建成员成功');
        isFormModified.value = false;
        return true;
      } else if (response.data.code === 20403) {
        ElMessage.error('权限不足');
      } else if (response.data.code === 10001) {
        ElMessage.error(response.data.message || '参数无效，请检查输入');
      } else {
        ElMessage.error('创建成员失败');
      }
    } catch (error) {
      if (error.response) {
        ElMessage.error(error.response.data.message || '请求失败，请稍后重试');
      } else if (error.code === 'ECONNABORTED') {
        ElMessage.error('请求超时，请稍后重试');
      } else {
        ElMessage.error('创建成员失败，请稍后重试');
      }
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

  // 自动监听表单修改
  watch(formData, () => {
    isFormModified.value = true;
  }, { deep: true });

  return {
    formData,
    selectedTeamPosition, 
    selectedRole,
    isFormModified,
    initializeNewUser,
    resetForm,
    createTeamMember,
    handleBack,
  };
};


