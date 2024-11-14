import { ref } from 'vue';
import axios from 'axios';

export default function useLike(likeCount) {
  const isLiked = ref(false);

  async function toggleLike() {
    try {
      const response = await axios.put('/api/PutLikeCount', {
        atoken: localStorage.getItem('atoken'),
        userid: localStorage.getItem('userid'),
      });
      if (response.data.code === 200) {
        isLiked.value = !isLiked.value;
        likeCount.value = response.data.likecount;
      } else {
        console.error('点赞请求失败');
      }
    } catch (error) {
      console.error('点赞请求出错:', error);
    }
  }

  return { toggleLike, isLiked };
}
