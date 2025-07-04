<template>
  <div class="flex items-center gap-2xs">
    <Button
      icon="AngleRight"
      type="tertiary"
      :disabled="disablePrev"
      size="small"
      @click="$emit('arrowPrev')"
    />
    <Button
      icon="AngleLeft"
      type="tertiary"
      :disabled="disableNext"
      size="small"
      @click="$emit('arrowNext')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { useDate, type SelectedType } from '../../../../date-picker/src/composables/date';
import Button from '../button/Button.vue';

const { date } = useDate();
defineEmits(['arrowPrev', 'arrowNext', 'monthExplorer', 'yearExplorer']);
interface Props {
  selectedMonth: SelectedType['month'];
  disableNext: boolean;
  disablePrev: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disableNext: false,
  disablePrev: false,
});
const { selectedMonth } = toRefs(props);
const month = ref(date(new Date()).year());

watch(selectedMonth, () => {
  month.value = selectedMonth.value;
});
</script>
<style lang="scss" scoped>
:deep(.root__variant--contained--tertiary) {
  @apply px-2xs py-2xs;
}
</style>
