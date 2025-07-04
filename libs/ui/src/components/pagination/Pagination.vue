<template>
  <div class="root">
    <div v-if="!loading">
      <div v-if="hideArrowsLimitPage" class="root__arrows">
        <Button
          v-if="page !== pages"
          type="tertiary"
          icon="ArrowsLast"
          class="w-2xl h-2xl justify-center root__arrows__btn"
          @click="toLast"
        />
        <Button
          variant="outlined"
          icon="AngleLeft"
          class="w-2xl h-2xl justify-center root__arrows__btn"
          :disabled="page === pages"
          @click="increase"
        />
        <Button
          variant="outlined"
          icon="AngleRight"
          class="w-2xl h-2xl justify-center root__arrows__btn"
          :disabled="page === 1"
          @click="decrease"
        />
        <Button
          v-if="page !== 1"
          type="tertiary"
          icon="ArrowsFirst"
          class="w-2xl h-2xl justify-center root__arrows__btn"
          @click="toFirst"
        />
        <div class="root__result--md">
          <div v-if="!loading && showPageInfo" dir="rtl" class="page">از {{ pages }} صفحه</div>
          <ActionButton
            :content="cardBoxPageList as unknown as Element"
            :value="page ? page.toString() : '1'"
            class="h-2xl"
            @close="closePageListHandler"
          />
        </div>
      </div>
    </div>

    <div v-else class="root__loading">
      <Skeleton :height="32" :width="32" />
      <Skeleton :height="32" :width="32" />
      <Skeleton :height="32" :width="1" class="hidden mx-md md:block" />
      <Skeleton :height="32" :width="64" class="hidden md:block" />
    </div>
    <div>
      <div dir="rtl" class="root__result">
        <div v-if="!loading" dir="rtl">
          {{ resultsText }}
        </div>
        <Skeleton v-else :width="72" :height="12" class="root__result__loading" />
      </div>
      <div class="root__result__md-section">
        <div v-if="loading" class="flex">
          <div><Skeleton :width="72" :height="12" class="root__result__loading" /></div>
          <template v-if="showPageSize">
            <div><Skeleton :height="32" :width="1" class="hidden mx-md md:block" /></div>
            <div><Skeleton :width="220" :height="12" class="root__result__loading" /></div>
          </template>
        </div>
        <template v-else>
          <div dir="rtl">{{ resultsText }}</div>
          <div v-if="showPageSize" class="root__result__md-section__action">
            <ActionButton
              :content="cardBoxSizeList as unknown as Element"
              :value="pageSizeRef.toString()"
              class="h-2xl"
              @close="closePageSizeHandler"
            />
            <div>:تعداد سطر در صفحه</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, toRefs, computed, onMounted, watch, type Ref } from 'vue';

import ActionButton from '../actionButton/ActionButton.vue';
import Button from '../button/Button.vue';
import Skeleton from '../skeleton/Skeleton.vue';
import PageList from './pageList.vue';
import PageSizeVue from './pageSize.vue';

export interface Props {
  currentPage: number;
  loading?: boolean;
  pages: number;
  pageSize: number;
  rows: number;
  showPageSize: boolean;
  showPageInfo: boolean;
  showResultsRange: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showPageSize: true,
  showPageInfo: true,
  showResultsRange: false,
});
const emit = defineEmits(['pageSizeSelected', 'pageSelected']);
const { currentPage, pageSize, pages, rows, showResultsRange } = toRefs(props);
const pageSizeRef = ref<number>(pageSize.value);
const page = ref<number>(0);
/**
 * set value of page size and close list
 * @param _ id
 * @param value selected page size
 */
const getPageSizeValue = (_: undefined, value: number) => {
  closerPageSize.value();
  pageSizeRef.value = value;
  page.value = 1;
  emit('pageSizeSelected', value);
};
/**
 * set current page and close list of pages
 * @param _ id
 * @param value select page from list
 */
const getPageListValue = (_: undefined, value: number) => {
  closerPageList.value();
  page.value = value;
  emit('pageSelected', value);
};
// render page size component
const cardBoxSizeList = h(PageSizeVue, {
  onAction: getPageSizeValue,
});
// render page list component
const cardBoxPageList = h(PageList, {
  data: pages,
  onAction: getPageListValue,
});
const closerPageSize: Ref<() => void> = ref(() => {});
const closerPageList: Ref<() => void> = ref(() => {});
// set closer for list of size
const closePageSizeHandler = (v: () => void) => {
  closerPageSize.value = v;
};
// set closer for list of page
const closePageListHandler = (v: () => void) => {
  closerPageList.value = v;
};
const hideArrowsLimitPage = computed(() => {
  if (rows.value > pageSize.value) {
    return true;
  }

  return false;
});
const increase = () => {
  if (page.value < pages.value) {
    page.value += 1;
    emit('pageSelected', page.value);
  }
};
const decrease = () => {
  if (page.value > 1) {
    page.value -= 1;
    emit('pageSelected', page.value);
  }
};
const toFirst = () => {
  if (page.value > 1) {
    page.value = 1;
    emit('pageSelected', page.value);
  }
};
const toLast = () => {
  if (page.value < pages.value) {
    page.value = pages.value;
    emit('pageSelected', page.value);
  }
};

onMounted(() => {
  page.value = currentPage.value;
});

const resultsText = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value + 1;
  const end = Math.min(currentPage.value * pageSize.value, rows.value);

  return showResultsRange.value ? `نتیجه ${start} - ${end}` : `${rows.value} نتیجه`;
});

watch(currentPage, () => {
  page.value = currentPage.value;
});
</script>

<style lang="scss" scoped>
@use './pagination.scss';
</style>
