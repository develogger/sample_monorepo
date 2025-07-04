import { i18n } from '@/locale/i18n';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n);
  const { t } = i18n.global;

  return {
    provide: {
      t,
    },
  };
});
