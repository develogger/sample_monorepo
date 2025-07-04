import { onBeforeMount } from 'vue';

export const useCountDown = (timeLeft = 5, afterCount: () => void) => {
  const timer = ref(timeLeft);
  const start = () => {
    const countDown = () => {
      if (timer.value == 0) {
        clearInterval(timerId);
        afterCount();
      } else {
        timer.value--;
      }
    };
    const timerId = setInterval(countDown, 1000);
    onBeforeMount(() => {
      clearInterval(timerId);
    });
  };

  return {
    start,
    timer,
  };
};
