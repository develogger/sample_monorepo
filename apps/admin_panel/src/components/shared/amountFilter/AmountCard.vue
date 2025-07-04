<template>
  <div class="root mt-[5px]">
    <form @submit.prevent="onSubmit">
      <ui-Card>
        <template #header>
          <div class="flex justify-between flex-row-reverse items-center">
            <div class="root__header">{{ $t('_common.filters.amount_filter') }}</div>

            <ui-Button
              v-if="route.query.lessAmount || route.query.moreAmount || route.query.equalAmount"
              :text="$t('_common.buttons.removeFilter')"
              type="tertiary"
              variant="text"
              before-icon="DeleteFill"
              size="small"
              class="pl-0 -ml-2xs !text-text-soft"
              @click="handleClear"
            />
          </div>
        </template>
        <template #main>
          <div class="root__list w-[300px]">
            <ui-Select
              v-if="isShow"
              :data="amountList"
              class="w-full h-3xl"
              after-icon="AngleDown"
              name="dropDown"
              :value="dropdownSelector"
              @selected-item="amountSelectHandler"
            />
            <ui-Select v-else name="loading" class="w-full h-3xl" after-icon="AngleDown" loading />
            <div v-if="dropdownSelector.id === 'equal'" class="w-full">
              <ui-TextField
                v-model="equalAmount"
                name="equalAmount"
                :unit="$t('_common.currency.rial')"
                amount
                is-number
                :helper="{
                  type: !!errors.equalAmount ? 'error' : undefined,
                  message: errors.equalAmount,
                }"
              />
            </div>
            <div
              v-if="dropdownSelector.id === 'less' || dropdownSelector.id === 'between'"
              class="flex justify-between items-center gap-md w-full"
            >
              <ui-TextField
                v-model="lessAmount"
                name="lessAmount"
                :unit="$t('_common.currency.rial')"
                amount
                is-number
                class="w-full"
                :helper="{
                  type: !!errors.lessAmount ? 'error' : undefined,
                  message: errors.lessAmount,
                }"
              />
              <span
                v-if="dropdownSelector.id === 'between'"
                :class="{ '-mt-2xl': errors.lessAmount }"
              >
                {{ $t('_common.date.from') }}
              </span>
            </div>
            <div
              v-if="dropdownSelector.id === 'more' || dropdownSelector.id === 'between'"
              class="flex justify-between items-center gap-md w-full"
            >
              <ui-TextField
                v-model="moreAmount"
                name="moreAmount"
                :unit="$t('_common.currency.rial')"
                amount
                is-number
                class="w-full"
                :helper="{
                  type: !!errors.moreAmount ? 'error' : undefined,
                  message: errors.moreAmount,
                }"
              />
              <span
                v-if="dropdownSelector.id === 'between'"
                :class="{ '-mt-2xl': errors.moreAmount }"
              >
                {{ $t('_common.date.to') }}
              </span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="root__footer">
            <ui-Button
              :disabled="isSubmitDisable"
              :text="$t('_common.buttons.confirm')"
              block
              html-type="submit"
              @click="handleData"
            />
          </div>
        </template>
      </ui-Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAmountFilter } from '@/composables/amountFilter/useAmountFilter';

export interface Value {
  id: string;
  title: string;
}
interface Props {
  isShow: Ref;
}
const props = defineProps<Props>();
const { isShow } = toRefs(props);
const { numberFormat } = useMath();
const t = useI18n();
const { amountSchema } = useAmountFilter();
const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: amountSchema(),
});
const dropdownSelector = ref({
  id: 'equal',
  title: t('_common.amount.equal'),
});
const emit = defineEmits(['action', 'close', 'clear']);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const lessAmount = ref('');
const moreAmount = ref('');
const equalAmount = ref('');
const handleData = () => {
  emit('action');
};
const handleClear = () => {
  emit('clear');
};
const isSubmitDisable = computed(() => {
  const { id } = dropdownSelector.value;
  const hasErrors =
    !!errors.value.moreAmount || !!errors.value.lessAmount || !!errors.value.equalAmount;
  const isBetweenSelected = id === 'between';
  if (!isBetweenSelected && (!!lessAmount.value || !!moreAmount.value || !!equalAmount.value)) {
    return hasErrors;
  } else if (!!lessAmount.value && !!moreAmount.value) {
    return hasErrors;
  }

  return true;
});
const amountList = [
  {
    title: t('_common.amount.equal'),
    id: 'equal',
  },
  {
    title: t('_common.amount.less'),
    id: 'less',
  },
  {
    title: t('_common.amount.more'),
    id: 'more',
  },
  {
    title: t('_common.amount.between'),
    id: 'between',
  },
];
const amountSelectHandler = (item: Value) => {
  if (item.id === dropdownSelector.value.id) {
    return;
  }
  if (item.id === 'between') {
    resetForm({
      values: {
        moreAmount: '',
        lessAmount: '',
        dropDown: t('_common.amount.between'),
      },
    });
    lessAmount.value = '';
    moreAmount.value = '';
  } else if (item.id === 'less') {
    resetForm({
      values: {
        lessAmount: '',
        dropDown: t('_common.amount.less'),
      },
    });
    lessAmount.value = '';
    moreAmount.value = '';
  } else if (item.id === 'more') {
    resetForm({
      values: {
        moreAmount: '',
        dropDown: t('_common.amount.more'),
      },
    });
    lessAmount.value = '';
    moreAmount.value = '';
  }
  dropdownSelector.value.id = item.id;
  dropdownSelector.value.title = item.title;
};
const handleFormDataFromRouteQuery = () => {
  if (!route.query.lessAmount && !route.query.moreAmount && !route.query.equalAmount) {
    resetForm({
      values: {
        equalAmount: '',
        dropDown: t('_common.amount.equal'),
      },
    });
    dropdownSelector.value.id = 'equal';
    dropdownSelector.value.title = t('_common.amount.equal');
    lessAmount.value = '';
    moreAmount.value = '';
    equalAmount.value = '';
  }
  if (route.query.lessAmount) {
    lessAmount.value =
      dropdownSelector.value.id === 'between'
        ? numberFormat(route.query.moreAmount as string)
        : numberFormat(route.query.lessAmount as string);
  }
  if (route.query.moreAmount) {
    moreAmount.value =
      dropdownSelector.value.id === 'between'
        ? numberFormat(route.query.lessAmount as string)
        : numberFormat(route.query.moreAmount as string);
  }
  if (route.query.equalAmount) {
    equalAmount.value = Number(route.query.equalAmount)
      ? numberFormat(route.query.equalAmount as string)
      : '';
  }
};
onMounted(() => {
  if (route.query.equalAmount) {
    dropdownSelector.value.id = 'equal';
    dropdownSelector.value.title = t('_common.amount.equal');
  }
  if (route.query.lessAmount) {
    dropdownSelector.value.id = 'less';
    dropdownSelector.value.title = t('_common.amount.less');
  }
  if (route.query.moreAmount) {
    dropdownSelector.value.id = 'more';
    dropdownSelector.value.title = t('_common.amount.more');
  }
  if (route.query.moreAmount && route.query.lessAmount) {
    dropdownSelector.value.id = 'between';
    dropdownSelector.value.title = t('_common.amount.between');
  }
  handleFormDataFromRouteQuery();
});

const onSubmit = handleSubmit(values => {
  const lessAmount =
    typeof values.lessAmount === 'string'
      ? (values.lessAmount as string).replace(/,/g, '')
      : undefined;
  const moreAmount =
    typeof values.moreAmount === 'string'
      ? (values.moreAmount as string).replace(/,/g, '')
      : undefined;
  const equalAmount =
    typeof values.equalAmount === 'string'
      ? (values.equalAmount as string).replace(/,/g, '')
      : undefined;
  router.push({
    query: {
      ...route.query,
      page: config.public.page,
      lessAmount: dropdownSelector.value.id === 'between' ? moreAmount : lessAmount,
      moreAmount: dropdownSelector.value.id === 'between' ? lessAmount : moreAmount,
      equalAmount,
    },
  });
  emit('close');
});
watch(
  () => [route.query, isShow.value],
  () => {
    handleFormDataFromRouteQuery();
  }
);
</script>

<style lang="scss" scoped>
.root {
  &__header {
    @apply text-right text-heading-600-h3;
  }
  &__list {
    @apply flex flex-col items-end gap-sm w-[266px] my-md;
  }
}
</style>
