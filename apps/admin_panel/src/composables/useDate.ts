import { i18n } from '@/locale/i18n';
import moment, { JUnitOfTime, Moment } from 'moment-jalaali';
import 'moment/locale/fa';

export default function useDate() {
  const { t } = i18n.global;
  const { toEnNumber } = useInput();
  /**
   * return jalali date
   * @param value // like: 2023/1/1
   * @returns // like: 1401/10/11 , امروز,دیروز
   */
  function toJalali(
    value: string,
    format = 'jDD jMMMM jYYYY, HH:mm',
    currentYearFormat = 'jDD jMMMM، HH:mm',
    todayFormat = ', HH:mm',
    yesterdayFormat = ', HH:mm'
  ) {
    moment.updateLocale('fa', {
      jMonths: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'اَمرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ],
    });
    moment.locale('fa');
    // moment.loadPersian({ dialect: 'persian-modern' });

    const m = moment(value);
    const now = moment();
    const isToday = m.isSame(now, 'day') && m.isSame(now, 'month') && m.isSame(now, 'year');
    const yesterday = now.clone().subtract(1, 'day');
    const isYesterday =
      yesterday.isSame(m, 'day') && yesterday.isSame(m, 'month') && yesterday.isSame(m, 'year');
    const isCurrentYear = m.year() === now.year();

    if (isToday && todayFormat === ', HH:mm') {
      return todayFormat
        ? t('_common.date.today') + m.format(todayFormat)
        : t('_common.date.today');
    } else if (isYesterday && yesterdayFormat === ', HH:mm') {
      return yesterdayFormat
        ? t('_common.date.yesterday') + m.format(yesterdayFormat)
        : t('_common.date.yesterday');
    } else if (isCurrentYear && currentYearFormat === 'jDD jMMMM، HH:mm') {
      return m.format(currentYearFormat);
    } else {
      return m.format(format);
    }
  }

  function fullDateJalali(value: string) {
    moment.loadPersian({ dialect: 'persian-modern' });
    const m = moment(value);

    return m.format('jYYYY/jMM/jDD, HH:mm');
  }

  function getHours(value: string) {
    const m = moment(value);

    return m.format('HH:mm:ss');
  }

  function getNow() {
    return moment();
  }

  function getJalaliYear(value: string) {
    return moment(value).jYear();
  }

  function getMoment() {
    return moment;
  }

  /**
   * substract value of time
   * @param date input date like 2024/1/1
   * @param interval number of interval like:10
   * @param duration time of repeat like: days,months,...
   * @returns boolean value
   */
  function substract(
    date: moment.MomentInput,
    interval: number | string,
    duration: moment.unitOfTime.DurationConstructor | undefined
  ) {
    const now = moment();
    const m = moment(date);

    return m.isAfter(now.subtract(interval, duration));
  }

  function numberFormat(value: string) {
    if (typeof value === 'undefined') {
      return value;
    }

    return parseInt(value).toLocaleString('en');
  }

  function setTimeRange(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    const startTime = moment().set({
      hour: startHour,
      millisecond: 0,
      minute: startMinute,
      second: 0,
    });
    const endTime = moment().set({ hour: endHour, millisecond: 0, minute: endMinute, second: 0 });

    return {
      endTime,
      startTime,
    };
  }

  function compareDates(date1Str: Moment | string, date2Str: Moment | string) {
    const date1 = moment(date1Str);
    const date2 = moment(date2Str);

    if (date1.isBefore(date2)) {
      return { date1, date2, result: 'before' };
    } else if (date1.isAfter(date2)) {
      return { date1, date2, result: 'after' };
    } else {
      return { date1, date2, result: 'same' };
    }
  }

  function isYesterday(value: string) {
    const m = moment(value);
    const now = moment();
    const yesterday = now.clone().subtract(1, 'day');
    const isYesterday =
      yesterday.isSame(m, 'day') && yesterday.isSame(m, 'month') && yesterday.isSame(m, 'year');

    return isYesterday;
  }

  function subtract(subtract = 1, format = 'jYYYY-jMM-jDD', type = 'days' as string) {
    const date = moment()
      .clone()
      .subtract(subtract, type as JUnitOfTime)
      .format(format);

    return toEnNumber(date);
  }

  function toGregorian(value: string, format = 'YYYY-MM-DD', current = 'jYYYY-jMM-jDD') {
    moment.updateLocale('fa', {
      jMonths: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'اَمرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ],
    });
    moment.locale('fa');

    return toEnNumber(moment(value, current).format(format));
  }

  function convert(value?: string, from = 'jYYYY-jMM-jDD', to = 'jDD jMMMM') {
    moment.updateLocale('fa', {
      jMonths: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'اَمرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ],
    });
    moment.locale('fa');
    if (!value) {
      return toEnNumber(moment().format(to));
    }

    return toEnNumber(moment(value, from).format(to));
  }

  function convertQueryParamDate(value: string): string | undefined;
  function convertQueryParamDate(value: string, from: string, to: string): string | undefined;
  function convertQueryParamDate(value: string, from?: string, to?: string): string | undefined {
    const fromFormat = from || 'jYYYY-jMM-jD';
    const toFormat = to || 'YYYY-MM-DD';
    const val = convert(value, fromFormat, toFormat);

    if (val === 'Invalid date') {
      return undefined;
    }

    return val;
  }

  function getStartOf(value: string, unit = 'month', format = 'YYYY-MM-DD') {
    let val = value;
    if (!value) {
      val = toEnNumber(moment().format(format));
    }

    return toEnNumber(
      moment(val, format)
        .startOf(unit as unknown as JUnitOfTime)
        .format(format)
    );
  }

  function getEndOf(value: string, unit = 'month', format = 'YYYY-MM-DD') {
    let val = value;
    if (!value) {
      val = toEnNumber(moment().format(format));
    }

    return toEnNumber(
      moment(val, format)
        .endOf(unit as unknown as JUnitOfTime)
        .format(format)
    );
  }

  return {
    compareDates,
    convert,
    convertQueryParamDate,
    fullDateJalali,
    getEndOf,
    getHours,
    getJalaliYear,
    getMoment,
    getNow,
    getStartOf,
    isYesterday,
    numberFormat,
    setTimeRange,
    substract,
    subtract,
    toGregorian,
    toJalali,
  };
}
