<template>
  <div class="root" dir="rtl">
    <form dir="rtl" @submit.prevent="">
      <p class="text-text-soft text-body-400-b3 mb-xl">
        {{ $t('_user.accessToken.personal.addPersonalAccessTokenDescribe') }}
      </p>
      <ui-TextField
        v-model="tokenName"
        :auto-focus="false"
        :loading="loading"
        :disabled="loading"
        name="tokenName"
        dir="ltr"
        :placeholder="$t('_user.accessToken.personal.heading')"
        :helper="{
          type: !!errors?.tokenName ? 'error' : undefined,
          message: errors?.tokenName,
        }"
      />
      <ui-Divider class="mt-xl" />

      <div class="flex justify-between float-left my-md">
        <ui-Button
          size="medium"
          class="inline-flex main__item--button"
          type="secondary"
          :text="$t('common.cancel')"
          :disabled="loading"
          @click="toggleModal"
        />
        <ui-Button
          class="inline-flex mr-xs main__item--button"
          size="medium"
          type="primary"
          :text="$t('_user.accessToken.personal.add')"
          :loading="loading"
          :disabled="loading || !tokenName || !meta?.valid"
          @click="formSubmit"
        />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  loading?: boolean;
}
const tokenName = ref<string>();
const props = withDefaults(defineProps<Props>(), {});
const { loading } = toRefs(props);
const toggleModal = inject<(() => void | undefined) | undefined>('toggleModal');
const formSubmit = inject('form_submit');
const meta: Record<string, string> | undefined = inject('form_meta');
const errors: globalThis.ComputedRef<Partial<Record<'tokenName', string | undefined>>> | undefined =
  inject('form_errors');
</script>
