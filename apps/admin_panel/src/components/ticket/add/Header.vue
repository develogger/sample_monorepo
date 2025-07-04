<template>
  <div class="head">
    <ui-PageHeading
      :title="$t('_common.page_title.addTicket')"
      has-back
      @back-roll="$router.push(`/panel/ticket/faq`)"
    >
    </ui-PageHeading>
  </div>
</template>

<script setup lang="ts"></script>
