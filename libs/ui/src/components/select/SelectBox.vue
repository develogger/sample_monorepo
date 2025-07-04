<template>
  <div :style="{ width: parentWidth.value + 'px' }" class="ml-[1px]">
    <Card class="root" dir="rtl">
      <template #main>
        <!-- loading list -->
        <div v-if="(!data || data.length === 0) && loading" class="root__loading">
          <Skeleton :height="20" :width="88" />
          <Skeleton :height="20" :width="157" />
          <Skeleton :height="20" :width="118" />
        </div>
        <!-- empty list -->
        <div v-if="(!data || data.length === 0) && !loading" class="root__empty">
          <Illustration name="EmptyPaper" />
          <span class="root__empty__title">موردی یافت نشد</span>
        </div>
        <!-- data list -->
        <div v-else class="root__list">
          <div
            v-for="i in data"
            :key="i.id"
            class="root__list__item--initial"
            :class="[
              selectedId === i.id ? classValue : 'root__list__item--default',
              i.disabled ? 'root__list__item--disabled' : '',
            ]"
            dir="ltr"
            @click="!i.disabled && handleChange(i)"
          >
            <div>
              <Icon
                v-if="selectedId === i.id"
                name="TickLarge"
                class="w-md h-md text-primary text-heading-600-h3"
              />
            </div>
            <div class="flex">
              <div class="flex flex-col">
                <span
                  v-if="i.title"
                  :class="
                    i.disabled
                      ? 'root__list__item__title--disabled'
                      : 'root__list__item__title--default'
                  "
                >
                  {{ i.title }}
                </span>
                <span
                  v-if="i.description"
                  class="mt-xs"
                  :class="
                    i.disabled
                      ? 'root__list__item__description--disabled'
                      : 'root__list__item__description--default'
                  "
                >
                  {{ i.description }}
                </span>
              </div>
              <div v-if="i.icon" class="pl-xs">
                <Icon
                  :name="i.icon"
                  :class="i.disabled ? 'root__list__item__icon--disabled' : ''"
                />
              </div>
              <div v-if="i.BankLogo" class="pl-xs">
                <BankLogo
                  :name="i.BankLogo"
                  :class="i.disabled ? 'root__list__item__icon--disabled' : ''"
                  class="w-xl h-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, toRefs, onMounted, watch } from 'vue';
import Card from '../card/Card.vue';
import Icon from '../icon/Icon.vue';
import BankLogo from '../bankLogo/BankLogo.vue';
import Illustration from '../illustration/Illustration.vue';
import Skeleton from '../skeleton/Skeleton.vue';

export interface DataType {
  id: number | string;
  title: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  BankLogo?: string;
}

export interface Props {
  value: {
    id: number | string;
    title: string;
  };
  parentWidth: Ref<number>;
  loading: boolean | undefined;
  data: DataType[] | undefined;
}
const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(['selected']);
const { data, loading, value } = toRefs(props);
const classValue = ref<string>();
const selectedId = ref<string | number>();
const handleChange = (item: DataType) => {
  selectedId.value = item.id;
  if (item.disabled) {
    classValue.value = 'root__list__item--disabled';
  } else if (item.id) {
    classValue.value = 'root__list__item--active';
  }
  emits('selected', item);
};
onMounted(() => {
  handleChange(value.value);
});
watch(value, () => {
  handleChange(value.value);
  selectedId.value = value.value.id;
});
</script>

<style lang="scss" scoped>
@use './selectBox.scss';
</style>
