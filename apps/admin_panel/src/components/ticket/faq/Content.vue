<template>
  <div class="root">
    <ui-Card class="w-full">
      <template #header>
        <div class="root__title">
          <ui-Skeleton v-if="loading" :height="30" :width="60" />
          <span v-if="!loading && data">{{ $t(`_common.slug.${faqStore.slug}`) }}</span>
        </div>
      </template>
      <template #main>
        <div v-if="data && data.Faqs">
          <div
            v-for="item in data.Faqs.filter(i => i?.slug === faqStore.slug)"
            :key="String(item?.id)"
          >
            <ui-Accordion :loading="loading" class="text-right" :label="String(item?.question)">
              <template #content>
                <div
                  class="text-wrap"
                  dir="rtl"
                  v-html="checkCustomContent(mdRender.render(String(item?.answer).trim()))"
                ></div>
              </template>
            </ui-Accordion>
          </div>
        </div>
        <div v-else class="w-full">
          <ui-Accordion v-for="item in 4" :key="item" :loading="loading" class="text-right" />
        </div>
        <div class="root__divider">
          <ui-Divider />
        </div>
        <div class="root__notice" dir="rtl">
          <ui-skeleton v-if="loading" :width="300" />
          <ui-Icon v-if="!loading" name="InfoFill" class="root__notice__icon" />
          <i18n-t
            v-if="!loading"
            keypath="_common.notice.addTicket"
            tag="p"
            class="text-body-400-b2 text-text"
          >
            <template #action>
              <NuxtLink to="/panel/ticket/add" class="primary--link px-xs">
                {{ $t('_common.notice.newTicket') }}
              </NuxtLink>
            </template>
          </i18n-t>
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
const { mdRender, checkCustomContent } = useMarkdown();
const { data, loading } = useFaqQuery();
const faqStore = useFaqStore();
</script>

<style lang="scss" scoped>
@use './content.scss';
</style>
