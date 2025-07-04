<template>
  <div class="head">
    <ui-PageHeading
      has-back
      :title="$t('_common.page_title.faq')"
      :description="$t('_common.pageHeading.faqDescription')"
      @back-roll="$router.push('/panel/ticket')"
    >
    </ui-PageHeading>
  </div>
</template>
