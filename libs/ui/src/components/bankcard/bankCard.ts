import tokens from '../../designTokens/colors';

const cardHandler = (bankName: string) => {
  const bankNameLowerCase = bankName.toLowerCase();
  const isDark = bankName.endsWith('Dark');
  const spliceDark = bankNameLowerCase.slice(0, -4);
  if (isDark) {
    return (
      (tokens.colors.bank.dark as unknown as Record<string, string>)[spliceDark] ||
      tokens.colors.bank.dark.bankMarkazi
    );
  }

  return (
    (tokens.colors.bank as unknown as Record<string, string>)[bankName] ||
    (tokens.colors.bank as unknown as Record<string, string>)[bankNameLowerCase] ||
    tokens.colors.bank.bankMarkazi
  );
};
const bankCard = () => ({
  cardHandler,
});
export default bankCard;
