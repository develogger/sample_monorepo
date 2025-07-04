import axios from 'axios';

export const useNextLogout = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const nextLogout = async () => {
    authStore.showLogOut = false;
    authStore.spaLoading = true;
    const response = await axios.get(
      `${config.public.public_api_base}/oauth/logout?redirect=${config.public.zarin_url}&beta=1`
    );
    if (response.status === 200 && response.data?.data) {
      if (response.data.redirect) {
        window.location.replace(response.data.redirect);
      } else {
        window.location.reload();
      }
    }
  };

  return { nextLogout };
};
