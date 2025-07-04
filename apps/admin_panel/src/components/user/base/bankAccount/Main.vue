<template>
  <div>
    <div class="mb-xl">
      <span class="text-heading-600-h2">
        {{ $t('_bank_account.title') }}
      </span>
    </div>
    <SharedBankAccountHeader is-user-bank-account />
  </div>
</template>
<script lang="ts" setup>
const t = useI18n();
useHead({
  title: t('_user.bank_account.title'),
});
</script>
