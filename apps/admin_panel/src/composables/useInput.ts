function toEnNumber(payload: number | string): string {
  const modifiedToEnNumber = payload
    .toString()
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => (d.charCodeAt(0) - 1632).toString())
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d: string) => (d.charCodeAt(0) - 1776).toString());

  return payload === '' ? payload : modifiedToEnNumber;
}

export const useInput = () => ({
  toEnNumber,
});
