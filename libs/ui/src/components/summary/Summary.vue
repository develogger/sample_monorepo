<template>
  <div class="summary">
    <div v-for="(item, index) in items" :key="item.id" class="summary__loop">
      <Skeleton v-if="loading" :height="12" class="mb-xs" />
      <div
        v-else
        :class="[index === 0 ? 'summary__value' : 'summary__second-value', item.class]"
        dir="rtl"
      >
        <Status v-if="item.status?.type" :type="item.status?.type" :text="item.status?.text" />
        <template v-else>
          <span class="">{{ item.value }}</span>
          <BankLogo v-if="item.logo" :name="item.logo" class="w-[24px] h-[24px] mr-xs" />
        </template>
      </div>
      <Divider border-style="dashed" class="grow px-xs" />

      <Skeleton v-if="loading" :height="12" class="mb-xs" />
      <div v-else class="summary__title">
        <Tooltip v-if="item.description" :content="item.description ?? ''" position="top">
          <Icon v-if="item.icon" :name="item.icon" class="!text-heading-600-h3" />
        </Tooltip>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Tooltip from '../tooltip/Tooltip.vue';
import Divider from '../divider/Divider.vue';
import Icon from '../icon/Icon.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import BankLogo from '../bankLogo/BankLogo.vue';
import Status from '../status/Status.vue';

interface StatusProps {
  dot?: boolean;
  loading?: boolean;
  icon?: string;
  text?: string;
  type: string;
}
export interface DataType {
  id: string;
  title: string;
  value: string;
  icon?: string;
  logo?: string;
  description?: string;
  class?: string;
  status?: StatusProps;
}
export interface Props {
  items: DataType[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { items } = toRefs(props);
</script>
<style lang="scss" scoped>
.summary {
  @apply bg-surface-soft p-sm w-full space-y-md rounded-sm;
  &__loop {
    @apply flex justify-between items-center overflow-hidden;
  }
  &__value {
    @apply text-body-500-b3 text-text flex-none text-left;
  }
  &__title {
    @apply text-text-soft text-body-500-b3 flex-none text-right flex items-center gap-xs;
  }
  &__second-value {
    @apply text-body-400-b3 flex-none text-left;
  }
  &__second-title {
    @apply text-text-soft text-body-400-b3 flex-none text-right flex gap-sm;
  }
}
</style>
