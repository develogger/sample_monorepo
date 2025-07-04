import { Invoice } from '@/graphql/graphql';
import { useTerminalStore } from '@/stores/terminalStore';

export const useInvoiceAction = () => {
  const actionHandle = (id: Invoice['id']) => {
    const t = useI18n();
    const router = useRouter();
    const config = useRuntimeConfig();
    const terminal = useTerminalStore();
    const { $notify } = useNuxtApp();

    return [
      {
        active: true,
        command: () => router.push(`/panel/${terminal.currentDomain}/invoice/${id}`),
        divider: true,
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => {
          navigator.clipboard.writeText(`${config.public.invoice}${id}`);
          $notify({
            isRead: false,
            message: t('common.copied'),
            type: 'success',
          });
        },
        icon: 'Copy',
        id: 2,
        label: t('_common.buttons.invoice_copy'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
