import { useBankAccountStore } from '@/stores/bankAccountStore';
import { ref } from 'vue';

export function useBankAccountColumns() {
  const t = useI18n();
  const store = useBankAccountStore(); // now safe to call inside the composable
  const columns = ref([
    {
      id: 1,
      label: t('_bank_account.account'),
      name: 'iban',
      width: '50%',
    },
    {
      id: 2,
      label: t('_bank_account.bank'),
      name: 'slug',
      width: '25%',
    },
    {
      id: 3,
      label:
        store.modalType === 'instantPay' ? t('_common.table.payout') : t('_common.table.status'),
      name: 'status',
      width: '25%',
    },
  ]);

  return {
    columns,
  };
}
