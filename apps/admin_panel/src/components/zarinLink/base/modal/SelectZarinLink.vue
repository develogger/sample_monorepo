<script lang="ts" setup>
import { useTerminalStore } from '@/stores/terminalStore';

interface IZarinLinkSelect {
  title: string;
  description: string;
  icon: string;
  link?: string;
  disable?: boolean;
}

const t = useI18n();
const terminal = useTerminalStore();
defineEmits(['close']);

const zarinLinks: IZarinLinkSelect[] = [
  {
    title: t('_zarin_link.zarin_link_create_modal.payment_link_title'),
    description: t('_zarin_link.zarin_link_create_modal.payment_link_description'),
    link: `/panel/${terminal.currentDomain}/zarin-link/payment/add`,
    icon: 'TakePaymentLink',
  },
  {
    title: t('_zarin_link.zarin_link_create_modal.product_link_title'),
    description: t('_zarin_link.zarin_link_create_modal.product_link_description'),
    link: `/panel/${terminal.currentDomain}/zarin-link/product/add`,
    icon: 'ItemLink',
  },
  {
    title: t('_zarin_link.zarin_link_create_modal.reservation_link_title'),
    description: t('_zarin_link.zarin_link_create_modal.reservation_link_description'),
    link: `/panel/${terminal.currentDomain}/zarin-link/reservation/add`,
    icon: 'EventLink',
  },
  {
    title: t('_zarin_link.zarin_link_create_modal.subscription_link_title'),
    description: t('_zarin_link.zarin_link_create_modal.subscription_link_description'),
    link: `/panel/${terminal.currentDomain}/zarin-link/subscription/add`,
    icon: 'DonationLink',
  },
];
</script>

<template>
  <ui-Modal
    close-icon
    :text="$t('_common.modal.new_zarin_link')"
    class="w-full lg:max-w-[400px] min-h-[460px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="space-y-xl">
        <p class="text-text-soft text-body-400-b3">
          {{ $t('_zarin_link.zarin_link_create_modal.description') }}
        </p>
        <div class="space-y-md">
          <NuxtLink
            v-for="{ title, description, disable, link, icon } in zarinLinks"
            :key="title"
            :to="link && link"
            class="mb-xs block relative"
          >
            <div dir="ltr">
              <ui-NavLink :icon="icon" :sub-text="description" :label="title" :disabled="disable" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
  </ui-Modal>
</template>
