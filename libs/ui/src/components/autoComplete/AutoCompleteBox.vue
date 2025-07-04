<template>
  <div :style="{ width: parentWidth.value + 'px' }" class="ml-[1px]">
    <Card class="root" dir="rtl">
      <template #main>
        <!-- searchbox -->
        <div class="pl-xs pb-xs">
          <TextField
            ref="searchRef"
            v-model="searchValue"
            name="search"
            after-icon="Search"
            :placeholder="placeholder"
            @input="handleSearch"
          />
        </div>
        <div v-if="computedSlots" class="pl-xs py-xs">
          <slot name="custom" />
          <Divider class="mt-xs" />
        </div>
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
            v-for="i in computedData"
            :key="i.id"
            :class="[
              selectedId === i.id ? classValue : 'root__list__item--default',
              i.disabled ? 'root__list__item--disabled' : '',
            ]"
            dir="ltr"
            @click="!i.disabled && handleChange(i)"
          >
            <div>
              <Icon v-if="selectedId === i.id" name="TickLarge" class="w-md h-md text-primary" />
            </div>
            <div class="flex">
              <div class="flex flex-col">
                <span
                  v-if="i.title"
                  dir="rtl"
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
              <div v-if="i.logo" class="pl-xs">
                <BankLogo
                  :name="i.logo"
                  class="w-[24px] h-[24px]"
                  :class="i.disabled ? 'root__list__item__icon--disabled' : ''"
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
import { ref, toRefs, computed, watch } from 'vue';

import debounce from 'lodash/debounce';
import Card from '../card/Card.vue';
import Icon from '../icon/Icon.vue';
import Illustration from '../illustration/Illustration.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import TextField from '../textField/TextField.vue';
import BankLogo from '../bankLogo/BankLogo.vue';
import Divider from '../divider/Divider.vue';
import type { BoxProps, DataType } from './autoCompleteTypes';

const props = withDefaults(defineProps<BoxProps>(), {});
const emits = defineEmits(['selected', 'search']);
const { data, loading, computedSlots, show, hasSearch } = toRefs(props);
const searchValue = ref<string>('');
const searchRef = ref();
const computedData = computed(() => {
  if (data.value) {
    if (!hasSearch.value) {
      return data.value.filter(i => i.title?.includes(searchValue.value));
    } else {
      return data.value;
    }
  }

  return [];
});
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
  searchValue.value = '';
};
const handleSearch = debounce((event: InputEvent) => {
  emits('search', (event.target as HTMLInputElement).value);
}, 2000);
defineExpose({ searchRef });
watch(
  () => show?.value,
  () => {
    searchRef.value.inputRef.focus();
  }
);
</script>

<style lang="scss" scoped>
@use './autoComplete.scss';
</style>
