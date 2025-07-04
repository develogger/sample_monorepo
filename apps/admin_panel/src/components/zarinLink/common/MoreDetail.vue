<script lang="ts" setup>
const t = useI18n();
const toggle = ref<boolean>(false);
const feeRadio = ref<'default' | 'acceptor' | 'buyer'>('default');
const onChangeToggle = () => {
  toggle.value = !toggle.value;
};
</script>

<template>
  <div class="rtl space-y-xl">
    <div
      class="flex items-center space-x-2xs text-body-400-b3 text-primary rtl"
      @click="onChangeToggle"
    >
      <p class="cursor-pointer">{{ t('_zarin_link.more_detail.more_detail_title') }}</p>
      <ui-Icon :name="toggle ? 'AngleUp' : 'AngleDown'" class="cursor-pointer" />
    </div>

    <div v-if="toggle" class="space-y-md">
      <p class="text-text-soft text-body-400-b3">{{ t('_zarin_link.more_detail.fee_payer') }}</p>

      <div class="flex flex-col items-end ltr space-y-sm">
        <ui-Radio :value="'default'" :loading="false" name="product_radio" :picked="feeRadio">
          <div class="flex items-center space-x-xs">
            <p>{{ t('_zarin_link.more_detail.default_setting') }}</p>
            <ui-Tooltip :content="$t('_common.buttons.settings')" position="top">
              <ui-Icon name="InfoFill" class="text-icon-disabled" />
            </ui-Tooltip>
          </div>
        </ui-Radio>
        <ui-Radio
          :label="$t('_form.add_invoice.acceptor')"
          :value="'acceptor'"
          :loading="false"
          name="product_radio"
          :picked="feeRadio"
        />
        <ui-Radio
          :label="$t('_form.add_invoice.buyer')"
          :value="'buyer'"
          :loading="false"
          name="product_radio"
          :picked="feeRadio"
        />
      </div>
    </div>
  </div>
</template>
