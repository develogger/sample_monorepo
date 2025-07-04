import { i18n } from '@/locale/i18n';

export const useMath = () => {
  /**
   * Formats a number or string value using the en-US number format.
   *
   * @param {number | string} value - The number or string value to format.
   * @return {string} The formatted number as a string.
   * @example 3,000
   */
  const { t } = i18n.global;

  function readableBytes(bytes: number): string {
    if (bytes === 0) {
      return '-';
    } else {
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      const sizes = [
        `${t('_common.fileSize.byte')}`,
        `${t('_common.fileSize.kByte')}`,
        `${t('_common.fileSize.megaByte')}`,
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB',
      ];

      return +(bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
    }
  }

  function numberFormat(value: number | string): string {
    const numberFormatter = new Intl.NumberFormat('en-US');
    if (typeof value === 'string') {
      const newValue = value.replace(/[^\d]/g, '');
      const formattedNumber = parseFloat(newValue);

      return numberFormatter.format(formattedNumber);
    }
    if (typeof value === 'number') {
      return numberFormatter.format(value);
    }

    return '';
  }

  function generateDiscountCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let discountCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      discountCode += characters[randomIndex];
    }

    return discountCode;
  }

  const cardFormat = (number: string) => {
    let text = number;
    const result = [];
    while (text.length > 4) {
      result.push(text.substring(0, 4));
      text = text.substring(4);
    }
    result.push(text);

    return result.join('-');
  };

  return { cardFormat, generateDiscountCode, numberFormat, readableBytes };
};
