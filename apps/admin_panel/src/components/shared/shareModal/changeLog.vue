<template>
  <ui-Modal
    :text="$t('_common.modal.updates')"
    class="w-full lib-view lg:max-w-[520px] !max-h-[794px]"
    close-icon
    @close="emits('close')"
  >
    <template #body>
      <div class="flex flex-col gap-md pb-md">
        <ui-Skeleton v-if="loading" class="rounded-t-md" radius="md" :width="480" :height="240" />
        <img
          v-show="!loading"
          class="rounded-t-md"
          src="../../../public/img/update.png"
          alt="welcome"
          @load="() => (loading = false)"
        />
        <div class="flex gap-xs text-text-soft text-body-500-b3 items-center">
          <span>{{ $t('_common.modal.version') }} : {{ data?.version }}</span>
          <span class="p-2xs rounded-circle bg-[#747481]" />
          <span v-if="data.created_at">
            {{ $t('_common.modal.releaseDate') }} :
            {{
              toJalali(
                data.created_at,
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY'
              )
            }}
          </span>
        </div>
        <div class="flex flex-col gap-md py-md">
          <div
            v-if="data?.content"
            class="content"
            v-html="
              checkCustomContent(
                String(
                  befMarked({
                    content: data.content as string,
                  })
                ).trim()
              )
            "
          ></div>
        </div>
      </div>
    </template>
    <template #footer>
      <ui-Button class="w-full" :text="$t('_common.buttons.ok')" @click="emits('close')" />
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { ReleaseChangeLogType } from '../../../graphql/graphql';
const emits = defineEmits(['close']);
const props = defineProps<{ data: ReleaseChangeLogType }>();
const { befMarked, checkCustomContent } = useMarkdown();
const { toJalali } = useDate();
const { data } = toRefs(props);
const loading = ref(true);
</script>
<style lang="scss" scoped>
:deep(.content) {
  li {
    @apply text-body-400-b2 font-normal;
  }
}
</style>
