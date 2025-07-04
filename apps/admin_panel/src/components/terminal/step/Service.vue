<template>
  <div class="flex flex-col gap-md">
    <ui-Radio-Card
      v-model="flag"
      class="!p-md"
      :loading="loading"
      :disabled="loading"
      :label="$t('_terminal.add.service.normal.title')"
      :description="$t('_terminal.add.service.normal.caption')"
      :val="TerminalFlagEnum.Normal"
      name="flag"
      @update:model-value="(e: string) => $emit('update:modelValue', e)"
    />
    <ui-Radio-Card
      v-model="flag"
      :disabled="loading || disableZarinLink"
      :loading="loading"
      :label="$t('_terminal.add.service.zarinlink.title')"
      :description="
        zarinLink?.id
          ? $t('_terminal.add.service.zarinlink.has_zarinlink_caption')
          : $t('_terminal.add.service.zarinlink.caption')
      "
      :val="TerminalFlagEnum.PersonalLink"
      :with-details="!!zarinLink?.id"
      class="!p-md"
      name="flag"
      @update:model-value="(e: string) => $emit('update:modelValue', e)"
    >
      <ui-ClipBoard v-if="zarinLink?.id" class="w-full" :content="zarinLink?.domain" />
    </ui-Radio-Card>
  </div>
  <div class="flex flex-col gap-sm">
    <ui-Button :text="$t('_common.buttons.confirm_and_continue')" size="large" @click="submit" />
    <ui-Button
      :text="$t('_common.buttons.return')"
      type="tertiary"
      size="large"
      @click="$router.push(homeUrl)"
    />
  </div>
</template>
<script lang="ts" setup>
import { TerminalFlagEnum, UserLevelEnum } from '@/graphql/graphql';
const { homeUrl } = useRedirectToHome();
const emit = defineEmits(['next', 'update:modelValue']);
interface Props {
  flag: TerminalFlagEnum;
}
const props = withDefaults(defineProps<Props>(), {});
const { data: user, loading: userLoading } = useUserIdQuery();
const { flag } = toRefs(props);
const { data, loading: terminalLoading } = useTerminalQuery();
const loading = computed(() => terminalLoading.value || userLoading.value);
const zarinLink = computed(() => {
  if (!data.value?.length) {
    return null;
  }

  return data.value?.find(
    t =>
      t.flag &&
      t.flag === TerminalFlagEnum.PersonalLink &&
      user.value?.id &&
      t.owner_id === user.value?.id
  );
});
const disableZarinLink = computed(
  () =>
    user.value?.level === UserLevelEnum.New ||
    user.value?.level === UserLevelEnum.Basic ||
    user.value?.level === UserLevelEnum.Blue ||
    !!zarinLink.value?.id
);
const submit = () => {
  emit('next', flag.value);
};
</script>
