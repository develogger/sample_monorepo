import { JUnitOfTime } from 'moment-jalaali';

export interface PresetType {
  action: () => void;
  arrow: boolean;
  label: string;
  meta: string;
}
export enum TAB {
  PRESET,
  RANGE,
}
export const useDateFilterColumn = () => {
  const router = useRouter();
  const route = useRoute();
  const t = useI18n();
  const { convert, getStartOf, subtract } = useDate();
  const tabs = [
    { label: t('_common.filters.range'), value: TAB.RANGE },
    { label: t('_common.filters.preset'), value: TAB.PRESET },
  ];
  const dateFilterList = [
    {
      id: 'day',
      title: t('_common.date.today'),
    },
    {
      id: 'week',
      title: t('dashboard.chart.current_week'),
    },
    {
      id: 'month',
      title: t('dashboard.chart.current_month'),
    },
  ];
  const presets = ref<PresetType[]>([
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: convert('', 'YYYY-MM-DD', 'jYYYY/jMM/jDD'),
            to: convert('', 'YYYY-MM-DD', 'jYYYY/jMM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.today');
      },
      arrow: false,
      label: t('_common.date.today'),
      meta: convert('', 'YYYY-MM-DD HH:mm:ss', 'jYYYY/jMM/jDD'),
    },
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: subtract(1, 'jYYYY/jMM/jDD'),
            to: subtract(1, 'jYYYY/jMM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.yesterday');
      },
      arrow: false,
      label: t('_common.date.yesterday'),
      meta: subtract(1, 'jYYYY/jM/jDD'),
    },
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: getStartOf('', 'week', 'jYYYY/jM/jDD'),
            to: convert('', undefined, 'jYYYY/jM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.current_week');
      },
      arrow: false,
      label: t('_common.date.current_week'),
      meta: `${getStartOf('', 'week', 'jYYYY/jM/jDD')} - ${convert('', undefined, 'jYYYY/jM/jDD')}`,
    },
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: getStartOf('', 'jMonth', 'jYYYY/jM/jDD'),
            to: convert('', undefined, 'jYYYY/jM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.current_month');
      },
      arrow: false,
      label: t('_common.date.current_month'),
      meta: `${getStartOf('', 'jMonth', 'jYYYY/jM/jDD')} - ${convert(
        '',
        undefined,
        'jYYYY/jM/jDD'
      )}`,
    },
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: subtract(1, 'jYYYY/jMM/jDD', 'jMonth'),
            to: convert('', undefined, 'jYYYY/jM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.prev_month');
      },
      arrow: false,
      label: t('_common.date.prev_month'),
      meta: `${subtract(1, 'jYYYY/jMM/jDD', 'jMonth')} - ${convert('', undefined, 'jYYYY/jM/jDD')}`,
    },
    {
      action: () => {
        router.push({
          query: {
            ...route.query,
            from: subtract(7, 'jYYYY/jMM/jDD', 'days' as JUnitOfTime),
            to: convert('', undefined, 'jYYYY/jM/jDD'),
          },
        });
        selectedAction.value = () => t('_common.date.prev_week');
      },
      arrow: false,
      label: t('_common.date.prev_week'),
      meta: `${subtract(7, 'jYYYY/jMM/jDD', 'days' as JUnitOfTime)} - ${convert(
        '',
        undefined,
        'jYYYY/jM/jDD'
      )}`,
    },
    {
      action: () => {
        selectedAction.value = () => undefined;
      },
      arrow: true,
      label: t('_common.filters.range'),
      meta: '',
    },
  ]);
  const selectedAction = ref<(() => string | undefined) | null>(null);

  return {
    dateFilterList,
    presets,
    selectedAction,
    tabs,
  };
};
