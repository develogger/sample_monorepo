import { createI18n } from 'vue-i18n';

import fa from '../locale/fa-IR.json';

export const i18n = createI18n({
  fallbackLocale: 'fa-IR',
  globalInjection: false,
  legacy: false,
  locale: 'fa-IR',
  messages: {
    'fa-IR': fa,
  },

  silentFallbackWarn: true,
});
