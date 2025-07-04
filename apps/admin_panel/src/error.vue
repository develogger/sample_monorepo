<script setup lang="ts">
import type { NuxtError } from '#app';

export interface Props {
  error: NuxtError;
}
const props = withDefaults(defineProps<Props>(), {});
const { error } = toRefs(props);
const { homeUrl } = useRedirectToHome();
const config = useRuntimeConfig();
const t = useI18n();
const message: string =
  error.value?.statusCode === 404 ? t('_error.page_not_found') : t('_error.unknown_error');
useHead({
  title: `${t('_common.app_name')} | ${message}`,
});
const links = ref({
  home: config.public.zarin_url,
  contact_us: `${config.public.zarin_url}contact.html`,
  about_us: `${config.public.zarin_url}aboutus.html`,
});
const handleError = () => {
  const domain = useTerminalStore().currentDomain;
  const redirectRoute = domain ? `/panel/${domain}/dashboard` : '/panel/overview';

  clearError({ redirect: redirectRoute });
};
</script>

<template>
  <div class="bg-white-100 min-h-full" :dir="error?.statusCode === 404 ? 'ltr' : 'rtl'">
    <ui-Topbar>
      <template #centerSection>
        <NuxtLink :to="homeUrl">
          <ui-Logo name="zarinpalFaLight" />
        </NuxtLink>
      </template>
    </ui-Topbar>

    <main
      class="relative w-full min-h-[calc(100vh-56px)] bg-white dark:bg-surface-dark flex justify-center items-center"
    >
      <div
        class="flex justify-center items-center h-full bg-white w-full min-w-0 mb-4xl dark:bg-surface-dark"
      >
        <div class="relative">
          <ui-Illustration
            v-if="error?.statusCode === 404"
            name="Earth"
            class="absolute bottom-[10px] left-[60px] lg:bottom-[-115px] lg:left-[-75px]"
          />
          <ui-Illustration
            v-else
            name="Barrier"
            class="absolute right-[300px] top-[11px] w-[80px]"
          />
        </div>
        <ui-ErrorMessage
          :text="
            error?.statusCode === 404 ? $t('_error.page_not_found') : $t('_error.unknown_error')
          "
          :icon="error?.statusCode === 404 ? 'StatusCode404' : 'Error'"
        >
          <template #actions>
            <ui-Button
              class="w-full"
              type="tertiary"
              :text="$t('_error.back_to_dashboard')"
              @click="handleError"
            />
          </template>
        </ui-ErrorMessage>
        <div class="relative">
          <ui-Illustration
            v-if="error?.statusCode !== 404"
            name="Barrier"
            class="absolute left-[285px] top-[15px] w-[100px]"
          />
        </div>
      </div>
      <footer dir="rtl" class="absolute bottom-[40px] flex justify-center w-full">
        <NuxtLink :to="links.home" class="font-medium text-body-400-b3 text-text-soft">{{
          $t('_error.zarinpal_website')
        }}</NuxtLink>
        <ui-Divider type="vertical" height="20" class="mx-lg" />
        <NuxtLink :to="links.contact_us" class="font-medium text-body-400-b3 text-text-soft">{{
          $t('_error.contact_us')
        }}</NuxtLink>
        <ui-Divider type="vertical" height="20" class="mx-lg" />
        <NuxtLink :to="links.about_us" class="font-medium text-body-400-b3 text-text-soft">{{
          $t('_error.about_us')
        }}</NuxtLink>
      </footer>
    </main>
  </div>
</template>
