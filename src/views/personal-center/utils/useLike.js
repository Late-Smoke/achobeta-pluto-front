import { ref } from 'vue';
import axios from 'axios';

export function useLike(isLiked, likeCount, initialIsLiked, initialLikeCount) {
  // 回滚函数
  function rollbackToInitialState() {
    isLiked.value = initialIsLiked.value;
    likeCount.value = initialLikeCount.value;
  }

  // 点赞切换函数
  async function toggleLike() {
    const previousState = isLiked.value; // 保存当前状态
    const previousCount = likeCount.value;

    // 本地乐观更新
    isLiked.value = !isLiked.value;
    likeCount.value += isLiked.value ? 1 : -1;
          
    try {
      // 向新接口发送 PUT 请求
      const response = await axios.put(
        '/api/user-profile/like',
        {}, // 空对象表示没有请求体内容
        {
          headers: {
            Authorization: `${localStorage.getItem('atoken')}`,
          },
          timeout: 2000, // 设置请求超时时间
        });

        console.log('点赞',response)
      if (response.data.code === 20000) {
        // 更新点赞数为服务器返回的数据
        likeCount.value = response.data.data.like_count;
        isLiked.value = response.data.data.like_count > 0;
        // 强制刷新响应式
        console.log('点赞成功:', isLiked.value, likeCount.value);
      } else {
        isLiked.value = previousState;
        likeCount.value = previousCount;
        console.error('点赞请求失败');
        ElMessage.error('点赞失败，请稍后重试');
      }
    } catch (error) {
      isLiked.value = previousState;
      likeCount.value = previousCount;
      console.error('点赞请求出错:', error);
      ElMessage.error('网络错误，点赞失败');
    }
  }

  return {
    toggleLike,
    rollbackToInitialState,
  };
}
