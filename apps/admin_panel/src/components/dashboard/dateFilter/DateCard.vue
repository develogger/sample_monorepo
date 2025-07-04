<template>
  <div class="mt-[5px] w-[364px]">
    <ui-Card>
      <template #main>
        <div>
          <div>
            <!-- calendar -->
            <div class="mt-lg">
              <ui-Calendar
                :initial-date="selectedDate"
                :value="selectedDate"
                expose-format="YYYY/MM/DD"
                max
                :show="isShow"
                @expose="handleExposeDate"
              />
            </div>
          </div>
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
export interface DateType {
  formatValue: string | undefined;
}
const { subtract } = useDate();
const emit = defineEmits(['action', 'clear']);
const route = useRoute();
const router = useRouter();
const isShow = ref(false);
const selectedDate = ref();
let isFirstTime = true;
const setDateQuery = () => {
  emit('action', selectedDate.value);
  if (!isFirstTime) {
    return router.push({
      query: {
        ...route.query,
        selectedDate: selectedDate.value,
      },
    });
  }
  isFirstTime = false;
};
const handleExposeDate = (date: DateType) => {
  if (date.formatValue && selectedDate.value) {
    selectedDate.value = date.formatValue;
  } else {
    selectedDate.value = subtract(1, 'jYYYY-jMM-jDD');
  }
  setDateQuery();
};
onMounted(() => {
  isShow.value = true;
});
watch(
  () => route.query,
  () => {
    if (route?.query?.selectedDate) {
      selectedDate.value = route?.query?.selectedDate;
    } else {
      selectedDate.value = subtract(1, 'jYYYY-jMM-jDD');
    }
  },
  {
    immediate: true,
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
