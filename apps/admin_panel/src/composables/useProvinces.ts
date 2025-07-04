// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Province } from '~/components/shared/location/index.vue';

export const useProvinces = () => {
  const {
    data,
    error,
    pending: loading,
    refresh,
  } = useFetch<Province>('https://cdn.zarinpal.com/frontend-assets/static-data/provinces.json', {
    immediate: true,
  });

  return {
    data,
    error,
    loading,
    refresh,
  };
};
