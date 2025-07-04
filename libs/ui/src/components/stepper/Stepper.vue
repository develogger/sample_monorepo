<template>
  <div class="flex justify-center items-center max-w-[600px]" dir="rtl">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="flex flex-col flex-[1_0_0] justify-center items-center gap-sm py-xs"
    >
      <div :class="`${step.status} flex justify-center items-center w-full`">
        <div
          :class="`${step.status}-divider-before ${index === 0 ? 'divider-hidden' : ''} grow`"
        ></div>
        <div :class="`${step.status}-step flex justify-center items-center`">
          <div :class="`${step.status}-step-icon`">
            <Icon
              v-if="step.status === 'done'"
              name="CheckMarkCircleFill"
              class="text-text-success !text-heading-600-h3"
            />
          </div>
        </div>
        <div
          :class="`${step.status}-divider-after ${
            index === steps.length - 1 ? 'divider-hidden' : ''
          } grow`"
        ></div>
      </div>
      <div :class="`${step.status}-text text-body-400-b3`">
        {{ step.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../icon/Icon.vue';

export interface Step {
  status: 'done' | 'current' | 'inactive';
  text: string;
}
export interface Props {
  steps: Step[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.current-step,
.inactive-step,
.done-step {
  @apply w-md h-md rounded-circle border-2 border-solid;
}

.current {
  &-step {
    @apply border-border-success;

    &-icon {
      @apply w-xs h-xs rounded-circle bg-[#248061];
    }
  }

  &-divider {
    &-before {
      @apply h-[1px] bg-[#248061];
    }
    &-after {
      @apply h-[1px] bg-[#eeeef1];
    }
  }
}

.inactive {
  &-step {
    @apply border-border-divider;
  }

  &-text {
    @apply text-text-disabled;
  }

  &-divider {
    &-before {
      @apply h-[1px] bg-[#eeeef1];
    }
    &-after {
      @apply h-[1px] bg-[#eeeef1];
    }
  }
}

.done {
  &-step {
    @apply border-border-success;
    &-icon {
      @apply w-md h-md rounded-circle flex items-center justify-center;
    }
  }

  &-divider {
    &-before {
      @apply h-[1px] bg-[#248061];
    }
    &-after {
      @apply h-[1px] bg-[#248061];
    }
  }
}

.divider-hidden {
  @apply bg-transparent h-[1px];
}
</style>
