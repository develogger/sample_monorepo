<template>
  <div class="mt-[5px] w-[364px]">
    <ui-Card>
      <template #main>
        <div>
          <div class="relative">
            <ui-Tab v-model="activeTab" :items="tabs" has-border @update:model-value="handleTab" />
            <ui-Button
              v-if="!!route.query.from && !!route.query.to"
              :text="$t('_common.buttons.removeFilter')"
              type="tertiary"
              variant="text"
              before-icon="DeleteFill"
              size="small"
              class="pl-0 -ml-2xs absolute top-[14px] !text-text-soft"
              @click="handleClear"
            />
          </div>
          <div v-if="activeTab === TAB.PRESET" class="mt-md">
            <ui-NavLink
              v-for="item in presets"
              :key="item.label"
              :label="item.label"
              :arrow="item.arrow"
              :active="item.label === activeItem"
              class="mt-2xs"
              @click="handleNavLinkClick(item)"
            >
              <template #meta>
                <span class="text-text-soft text-caption-400-c1">{{ item.meta }}</span>
              </template>
            </ui-NavLink>
          </div>
          <div v-else>
            <!-- input date -->
            <div class="flex justify-between mt-xl items-center">
              <div>
                <ui-TextField
                  v-model="to"
                  name="to_date"
                  after-icon="Calendar"
                  :placeholder="$t('_common.date.placeholder')"
                  :label="false"
                />
              </div>
              <div class="px-sm text-text-soft">{{ $t('_common.date.to') }}</div>
              <div>
                <ui-TextField
                  v-model="from"
                  name="from_date"
                  after-icon="Calendar"
                  :placeholder="$t('_common.date.placeholder')"
                  :label="false"
                />
              </div>
              <div class="px-sm text-text-soft">{{ $t('_common.date.from') }}</div>
            </div>
            <!-- calendar -->
            <div class="mt-lg">
              <ui-Calendar
                v-if="isShow"
                only-current-month-days
                :range="true"
                :initial-date="rangeDate"
                expose-format="YYYY/MM/DD"
                max
                @expose="handleExposeDate"
              />
            </div>
            <!-- button -->
            <div class="mt-lg">
              <ui-Button
                :text="$t('_common.buttons.confirm')"
                type="primary"
                block
                @click="setDateQuery"
              />
            </div>
          </div>
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
import {
  type PresetType,
  TAB,
  useDateFilterColumn,
} from '@/composables/dateFilter/useDateFilterColumn';

export interface DateType {
  formatValue: string | undefined;
}
interface Props {
  isShow: Ref;
}
const props = defineProps<Props>();
const { isShow } = toRefs(props);
const emit = defineEmits(['action', 'clear']);
const router = useRouter();
const config = useRuntimeConfig();
const store = useFilterStore();
const route = useRoute();
const t = useI18n();
const activeTab = ref<TAB>(TAB.PRESET);
const activeItem = ref<string>();
const to = ref();
const from = ref();
const rangeDate = computed(() => [from.value, to.value]);
const { presets, tabs, selectedAction } = useDateFilterColumn();
const handleNavLinkClick = (item: PresetType) => {
  if (item.action) {
    item.action();
    if (selectedAction.value) {
      const argSelected = selectedAction.value();
      if (argSelected) {
        activeItem.value = argSelected;
        store.dateFilterVal = activeItem.value;
        emit('action');
      } else {
        activeTab.value = TAB.RANGE;
        activeItem.value = t('_common.filters.range');
        store.dateFilterVal = activeItem.value;
      }
    }
  }
};
const handleTab = (val: TAB) => {
  store.dateFilterTab = val;
  if (activeTab.value === TAB.RANGE) {
    activeItem.value = t('_common.filters.range');
    store.dateFilterVal = activeItem.value;
  }
};
const setDateQuery = () => {
  router.push({
    query: {
      ...route.query,
      page: config.public.page,
      from: from.value,
      to: to.value,
    },
  });
  emit('action');
};
const handleExposeDate = (date: DateType[]) => {
  if (date[0]) {
    from.value = date[0].formatValue;
  }
  if (date[1]) {
    to.value = date[1].formatValue;
  }
};
const handleClear = () => {
  emit('clear');
};
onMounted(() => {
  from.value = route.query?.from;
  to.value = route?.query?.to;
  activeItem.value = store.dateFilterVal;
});
watch(
  () => [route.query, isShow.value],
  () => {
    if (!route.query.from && !route.query.to) {
      activeItem.value = undefined;
      store.dateFilterVal = activeItem.value;
    }

    if (!route.query.from && !route.query.to && !isShow.value) {
      from.value = undefined;
      to.value = undefined;
    }
  }
);
</script>
<style lang="scss" scoped>
:deep(.vjl__calendar) {
  width: 100%;
}
:deep(.input input) {
  @apply font-yekanFa;
}
</style>
