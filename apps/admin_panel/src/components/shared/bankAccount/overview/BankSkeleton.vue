<template>
  <div class="flex items-center gap-sm">
    <div v-if="bank" class="">
      <ui-BankLogo :name="bank?.slug" class="w-xl h-xl" />
    </div>
    <div v-else class="bg-surface rounded-sm p-2xs w-xl h-xl flex items-start justify-center">
      <ui-Icon
        name="FinanceBank"
        class="!flex items-center h-md text-surface-heavy !text-heading-600-h3"
      />
    </div>
    <div class="text-body-500-b2" :class="{ 'bg-surface w-[56px] h-sm rounded-xs': !bank }">
      <template v-if="bank"> {{ $t('_bank_account.bank') }} {{ `${bank?.name}` }} </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Bank {
  name: string;
  slug: string;
}
interface Props {
  bank?: Bank;
}
withDefaults(defineProps<Props>(), {
  bank: undefined,
});
</script>
