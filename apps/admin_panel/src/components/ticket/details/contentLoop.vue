<template>
  <div class="replies">
    <div v-for="(reply, i) in replies" :key="reply?.id">
      <!-- date -->
      <div
        v-if="
          _union(
            replies && replies[i - 1]?.created_at.match(datePattern),
            replies && replies[i]?.created_at.match(datePattern)
          ).length > 1 || _isNil(replies && replies[i - 1])
        "
        class="replies__date-section"
        dir="rtl"
      >
        {{ toJalali(reply?.created_at) }}
      </div>
      <!-- content -->
      <div class="flex gap-md mb-xl">
        <div
          dir="rtl"
          :class="
            replies && initialId !== reply?.user?.id
              ? 'replies__root--second-user'
              : 'replies__root--default'
          "
        >
          <div
            class="replies__content"
            v-html="checkCustomContent(String(befMarked(reply)).trim())"
          ></div>
          <NuxtLink
            v-if="reply?.attachments.length"
            :to="reply?.attachments && reply?.attachments[0]?.url"
            class="primary--link mb-md"
            target="_blank"
          >
            {{ $t('_common.links.attachment') }}
          </NuxtLink>

          <div class="replies__footer">
            <span>
              {{ reply?.user?.full_name }}
            </span>
            •
            <span>{{ fullDateJalali(reply?.created_at) }}</span>
          </div>
        </div>
        <div class="w-[40px]">
          <ui-Avatar :src="reply?.user?.avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

export interface Props {
  drop?: boolean;
}

const ticketStore = useTicketStore();
const { detailsData: data } = storeToRefs(ticketStore);
const { toJalali, fullDateJalali } = useDate();
const { befMarked, checkCustomContent } = useMarkdown();
const route = useRoute();
const more = ref(false);
const datePattern = /\d{4}-\d{2}-\d{2}/;
const props = withDefaults(defineProps<Props>(), {
  drop: false,
});
const { drop } = toRefs(props);
// get first id of replies for handle background
const initialId = (data.value?.ticketReplies && data.value?.ticketReplies[0]?.user?.id) ?? '';
const replies = computed(() => {
  if (data.value && _isArray(data.value.ticketReplies)) {
    if (more.value || (data.value.ticketReplies && data.value.ticketReplies.length <= 3)) {
      return data.value.ticketReplies;
    } else if (!drop.value) {
      return _take(data.value.ticketReplies);
    } else {
      return _takeRight(data.value.ticketReplies, 2);
    }
  }
});
onMounted(() => {
  if (route.query.more === 'full') {
    more.value = true;
  } else {
    more.value = false;
  }
});
watch(
  () => route.query.more,
  () => {
    if (route.query.more === 'full') {
      return (more.value = true);
    } else {
      return (more.value = false);
    }
  }
);
</script>

<style lang="scss" scoped>
.replies {
  &__root--default {
    @apply w-full border border-border-divider rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__root--second-user {
    @apply w-full bg-surface-soft rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__date-section {
    @apply text-body-400-b3 text-text-soft text-center mb-xl;
  }
  &__content {
    @apply mb-md text-body-400-b2 text-text break-words;
    overflow-wrap: anywhere;
  }
  &__footer {
    @apply text-text-soft text-caption-400-c1 text-left;
  }
}
</style>
