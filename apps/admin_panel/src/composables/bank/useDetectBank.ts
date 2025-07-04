import { banks } from '@/consts/banks';

export const detectBankByPan = (pan: string) => {
  if (pan.length < 6 || pan.length > 16) return undefined;
  const pan_prefix = parseInt(pan.slice(0, 6), 10);
  const bank = banks.filter(b => b.pan === pan_prefix);

  return bank.length === 0 ? undefined : bank[0];
};
export const detectBankByIban = (iban: string) => {
  if (iban.length < 5) return undefined;
  const iban_prefix = iban.slice(2, 5);
  const bank = banks.filter(b => b.iban === iban_prefix);

  return bank.length === 0 ? undefined : bank[0];
};

export const useDetectBank = () => ({
  detectBankByIban,
  detectBankByPan,
});
