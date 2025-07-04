import { computed, type ComputedRef } from 'vue';

function useInputStyle(error: string, disabled: boolean): ComputedRef<string> {
  const style = computed(() => {
    if (disabled) {
      return 'input__inner--disabled';
    } else if (!!error) {
      return 'input__inner--error';
    } else {
      return 'input__inner--default';
    }
  });

  return style;
}

function toEnNumber(payload: number | string): string {
  const modifiedToEnNumber = payload
    .toString()
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => (d.charCodeAt(0) - 1632).toString())
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d: string) => (d.charCodeAt(0) - 1776).toString());

  return payload === '' ? payload : modifiedToEnNumber;
}

export const useInput = () => ({
  toEnNumber,
  useInputStyle,
});
