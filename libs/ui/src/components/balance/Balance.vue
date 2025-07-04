<template>
  <div dir="rtl" class="zp-balance" :class="{ 'border border border-border-divider': border }">
    <Skeleton v-if="loading" :width="40" />
    <div v-else class="zp-balance-title">
      <span>{{ btnText }}</span>
      <Icon
        v-if="hasRefresh"
        name="Reload"
        class="w-[20px] h-[20px] cursor-pointer text-primary"
        stroke="bg-primary"
        @click="emit('refresh')"
      />
    </div>
    <Skeleton v-if="loading" :width="24" :height="24" />
    <div v-else class="zp-balance__amount">
      <span class="font-bold" dir="ltr">{{ amount }}</span>
      <Label text="ریال" type="neutral" class="mr-2xs" />
    </div>
    <Skeleton v-if="loading" :width="104" />
    <Button v-if="plus && !loading" size="small" icon="Plus" />
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
import Button from '../button/Button.vue';
import Icon from '../icon/Icon.vue';
import Label from '../label/Label.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface Props {
  amount: string | number;
  border?: boolean;
  plus?: boolean;
  btnText?: string;
  loading?: boolean;
  hasRefresh: boolean;
}
const emit = defineEmits(['refresh']);
const props = withDefaults(defineProps<Props>(), {
  border: true,
  btnText: 'موجودی',
  hasRefresh: true,
});
const { amount, border, plus, loading } = toRefs(props);
</script>
<style lang="scss" scoped>
@use './balance.scss';
</style>
