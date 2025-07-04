<template>
  <div>
    <div class="searchFilter" @click="toggle = true">
      <ui-Icon
        v-if="!!selectedInputs.length"
        name="DeleteFill"
        class="searchFilter__clear"
        @click.stop="onClear"
      />
      <div v-else class="searchFilter__shortcode">
        <div class="text-center mt-[1px] font-medium text-body-400-b3">/</div>
      </div>
      <div class="searchFilter__start-section">
        <div v-if="inputValue" class="searchFilter__start-section__input__value">
          {{ inputValue }}
        </div>
        <div v-if="!selectedInputs.length" class="searchFilter__start-section__input__placeholder">
          {{ inputPlaceholder }}
        </div>
        <div class="truncate max-w-[320px] flex items-center gap-xs" dir="rtl">
          <div v-for="i in selectedInputs" :key="i.value" class="flex items-center gap-2xs">
            <ui-Label :text="i.label" dir="rtl" type="neutral" />
            <span class="flex items-center text-body-400-b2 pt-[2px]">{{ i.model }}</span>
          </div>
        </div>
        <div>
          <ui-Icon name="Search" class="!text-heading-600-h1" />
        </div>
      </div>
    </div>
    <Transition name="anime">
      <ui-SearchModal
        v-if="toggle"
        ref="searchModalRef"
        :rows="rows"
        :value="selectedInputs"
        :placeholder="placeholder"
        @submit="onSubmit"
        @close="onClose"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
export interface Props {
  placeholder?: string;
  rows?: RowType[] | undefined;
}
const t = useI18n();
const props = withDefaults(defineProps<Props>(), {
  rows: undefined,
  placeholder: '',
});
const { rows } = toRefs(props);
const emit = defineEmits(['submit']);
const keyupSearch = (e: KeyboardEvent) => {
  // if (e.key === '/') {
  //   toggle.value = true;
  // }
  if (e.key === 'Escape') {
    toggle.value = false;
  }
};
onMounted(() => {
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    keyupSearch(e);
  });
});
onBeforeUnmount(() => {
  window.removeEventListener('keyup', keyupSearch);
});
const toggle = ref(false);
const router = useRouter();
const route = useRoute();
const inputPlaceholder = ref<string>(t('_form.search.title'));
const inputValue = ref<string>('');
const inputItem = ref<RowType>();
const selectedInputs = ref<RowType[]>([]);
const searchModalRef = ref(null);
const onSubmit = (v: RowType[]) => {
  selectedInputs.value = v;
  toggle.value = false;
  emit('submit', v);
};
const onClose = (v: [string, RowType]) => {
  inputValue.value = v[0];
  inputItem.value = v[1];
  toggle.value = false;
};
const onClear = () => {
  inputValue.value = '';
  inputItem.value = undefined;
  const newQuery = { ...route.query };
  if (rows.value) {
    rows.value.forEach(row => {
      delete newQuery[row.value];
    });
    router.push({
      query: newQuery,
    });
  }
};
watch(
  () => route.query,
  () => {
    const currentQuery = { ...route.query };
    const filteredItems =
      rows.value &&
      rows.value.filter(row => {
        if (currentQuery[row.value]) {
          row.model = currentQuery[row.value] as string;
        }

        return currentQuery[row.value];
      });
    selectedInputs.value = filteredItems as RowType[];
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.searchFilter {
  @apply bg-surface rounded-xl border items-center border-border-divider h-2xl flex min-w-[12.5rem] justify-between py-2xs pr-xs cursor-pointer pl-2xs hover:shadow-border-hover active:shadow-border-focus-soft active:border-interactive-focus;
  &__start-section {
    @apply flex items-center gap-2xs;
    &__input {
      @apply w-full flex items-center;
      &__placeholder {
        @apply text-text-soft text-body-400-b2;
      }
      &__value {
        @apply text-text text-body-400-b2 mt-2xs truncate w-[10rem] text-right;
      }
    }
  }
  &__clear {
    @apply text-icon-disabled;
  }

  &__shortcode {
    @apply rounded-circle bg-surface-soft w-xl h-xl text-text;
  }
}
.anime-leave-active,
.anime-enter-active {
  transition: all 0.2s ease-out;
}
.anime-enter-from,
.anime-leave-to {
  @apply -translate-y-2xs;
}
</style>
