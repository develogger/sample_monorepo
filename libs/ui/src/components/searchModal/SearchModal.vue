<template>
  <div ref="modalRef" class="search-modal">
    <div id="search-modal-container" class="search-modal__container z-50">
      <div class="search-modal__container__input">
        <div class="search-modal__container__input__prefix">
          <Icon name="Search" />
        </div>
        <div ref="searchRef" class="search-modal__container__input__search-box flex">
          <input
            v-if="!selectedInputs.length"
            ref="inputRef"
            v-model="inputValue"
            class="w-full outline-none mt-2xs"
            :placeholder="placeholder"
            @focus="() => (focusedIndex = undefined)"
          />
          <div v-for="(i, index) in selectedInputs" :key="i.label" class="flex items-center gap-xs">
            <Label :text="i.label" type="neutral" />
            <input
              ref="inputRef"
              :key="i.value"
              v-model="i.model"
              class="min-w-[30px] outline-none mt-2xs"
              :style="{ width: shallowTextRef && shallowTextRef[index]?.clientWidth + 8 + 'px' }"
              @keyup.delete="handleRemoveItem(i.model as string, index)"
              @input="
                () => {
                  if (selectedInputs && selectedInputs.length) {
                    showCard = false;
                  }
                }
              "
              @keyup.space="
                () => {
                  showCard = true;
                }
              "
              @focus="() => (focusedIndex = undefined)"
            />
            <div ref="shallowTextRef" class="invisible absolute">{{ i.model }}</div>
          </div>
        </div>
        <div class="flex items-center pt-2xs">
          <Icon
            v-if="!!inputValue || !!selectedInputs.length"
            name="DeleteFill"
            class="search-modal__container__input__suffix"
            @click="clearAll"
          />
        </div>
      </div>
    </div>
    <div class="search-modal__container__card">
      <div v-if="showCard" class="search-modal__container__card__title">فرمت‌های قابل جستجو</div>
      <div v-if="showCard" class="search-modal__container__card__items">
        <div v-for="row in filteredRows" :key="row.value">
          <button
            ref="itemRefs"
            class="search-modal__container__card__item"
            @click.stop="handleSelected(row)"
            @keyup.enter="handleSelected(row)"
          >
            <Label :text="row.label" type="neutral" />
            <div class="search-modal__container__card__item__value">
              {{ row.helper }}
            </div>
          </button>
        </div>
      </div>
      <div class="search-modal__container__card__result">
        <Button
          v-if="!!selectedInputs.length"
          block
          :text="result"
          before-icon="ArrowLeft"
          class="text-left"
          @click="
            () => {
              emits('submit', selectedInputs);
            }
          "
        />
      </div>
    </div>
    <!-- <div class="search-modal__container__card__bottom">
      <div class="flex items-center gap-xs"><span class="pt-[2px]">↓↑</span> پیمایش</div>
      <div class="flex items-center gap-xs">
        <span class="flex items-center pb-2xs">␣</span> جدا کننده
      </div>
      <div class="flex items-center gap-xs"><span class="pt-[2px]">⏎</span>جستجو</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, type VNode, onMounted, onUnmounted, nextTick } from 'vue';
import { useDetectOutsideClick } from '../../composables/detects';
import { useKeyDown } from '../../composables/useKeyDown';
import Icon from '../icon/Icon.vue';
import Label from '../label/Label.vue';
import Button from '../button/Button.vue';

export interface Row {
  label: string;
  value: string | number;
  model: string;
  helper: string;
  active: boolean;
}

export interface Props {
  outsideClick?: boolean;
  placeholder?: string;
  value?: Row[] | undefined;
  item?: string;
  rows: Row[] | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  outsideClick: true,
  placeholder: '',
  item: '',
  value: undefined,
});

defineOptions({
  inheritAttrs: false,
});
const { outsideClick, item, rows, value } = toRefs(props);
const emits = defineEmits(['submit', 'close']);
const current = ref(0);
const prev = ref(0);
const showCard = ref(true);
const modalRef = ref<VNode>();
const inputValue = ref<string>('');
const inputItem = ref<Row>();
const selectedInputs = ref<Row[]>([]);
const inputRef = ref();
const itemRefs = ref();
const focusedIndex = ref<number>();
const shallowTextRef = ref();
const searchRef = ref();
const filteredRows = computed(() => {
  let result = rows.value;
  if (result) {
    if (selectedInputs.value && !!selectedInputs.value.length) {
      result = result.filter(item => !selectedInputs.value.some(val => val.value === item.value));
    }
    if (showCard.value && inputValue.value && !selectedInputs.value.length) {
      result = result.filter(item => item.label.includes(inputValue.value));
    }
  }

  return result;
});
// result button variable text
const result = computed(() => {
  const str = 'مشاهده نتایج';
  let label;
  let input;
  if (inputItem.value?.label) {
    label = inputItem.value.label;
  } else {
    label = '';
  }
  if (inputValue.value || !!selectedInputs.value.length) {
    input = selectedInputs.value[selectedInputs.value.length - 1].model;
  } else {
    input = '';
  }

  return `${str} "${label} ${input}"`;
});
// method
const closeModal = () => {
  emits('close', inputValue);
};
const handleSelected = (row: Row) => {
  row.active = true;
  selectedInputs.value.push(row);
  selectedInputs.value.map((val, index) => {
    if (index !== selectedInputs.value.length - 1) {
      val.active = false;
    } else {
      val.model = '';
    }

    return val;
  });
  inputValue.value = '';
  inputItem.value = row;
  handleFocus();
};
const closeModalOnClickOutside = () => {
  if (outsideClick.value) {
    closeModal();
  }
};
const handleRemoveItem = (val: string, index: number) => {
  prev.value = current.value;
  current.value = val ? val.length : 0;
  if (prev.value === 0 && current.value === 0) {
    clearSearch(index);
    handleFocus();
  }
};
const handleFocus = () => {
  nextTick(() => {
    if (selectedInputs.value.length) {
      inputRef.value && inputRef.value[selectedInputs.value.length - 1].focus();
    } else {
      inputRef.value && inputRef.value.focus();
    }
  });
};
const clearSearch = (index: number) => {
  inputValue.value = '';
  if (selectedInputs.value && !!selectedInputs.value.length) {
    selectedInputs.value.splice(index, 1);
    showCard.value = true;
  }
  inputItem.value = undefined;
};
const clearAll = () => {
  inputValue.value = '';
  selectedInputs.value = [];
  inputItem.value = undefined;
  showCard.value = true;
  handleFocus();
};
// directive of click outside
useDetectOutsideClick(modalRef, closeModalOnClickOutside);
// key-down composable
useKeyDown([
  {
    key: 'ArrowDown',
    fn: () => {
      if (showCard.value) {
        if (
          typeof focusedIndex.value !== 'number' ||
          (filteredRows.value && focusedIndex.value === filteredRows.value.length - 1)
        ) {
          focusedIndex.value = 0;
          itemRefs.value && itemRefs.value[focusedIndex.value].focus();
        } else if (typeof focusedIndex.value === 'number') {
          focusedIndex.value = focusedIndex.value + 1;
          itemRefs.value && itemRefs.value[focusedIndex.value].focus();
        }
      }
    },
  },
  {
    key: 'ArrowUp',
    fn: () => {
      if (showCard.value) {
        if (filteredRows.value && focusedIndex.value === 0) {
          focusedIndex.value = filteredRows.value.length - 1;
          itemRefs.value && itemRefs.value[focusedIndex.value].focus();
        } else if (typeof focusedIndex.value === 'number') {
          focusedIndex.value = focusedIndex.value - 1;
          itemRefs.value && itemRefs.value[focusedIndex.value].focus();
        }
      }
    },
  },
  {
    key: 'Enter',
    fn: () => {
      if (selectedInputs.value && selectedInputs.value.length && !showCard.value) {
        emits('submit', selectedInputs.value);
      }
    },
  },
]);
// hooks
onMounted(() => {
  document.body.style.overflow = 'hidden';
  if (value.value?.length) {
    selectedInputs.value = value.value;
    inputValue.value = selectedInputs.value[selectedInputs.value.length - 1].model;
  }
  if (item.value && rows) {
    const finder = rows.value?.find(row => row.value === item.value);
    inputItem.value = finder;
  }
  if (searchRef.value) {
    nextTick(() => {
      searchRef.value.scrollLeft = -1 * searchRef.value.clientWidth;
    });
  }
  nextTick(() => {
    if (selectedInputs.value.length) {
      inputRef.value && inputRef.value[selectedInputs.value.length - 1].focus();
    } else {
      inputRef.value && inputRef.value.focus();
    }
  });
});
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>
<style lang="scss">
@use './searchModal.scss';
</style>
