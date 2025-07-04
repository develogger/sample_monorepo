import dayjs, { Dayjs, extend } from 'dayjs';
import fa from 'dayjs/locale/fa';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import moment from 'moment-jalaali';

import jalali from '../modules';
import { fa as jmonth } from '../modules/constant';

export type Boundary = (RegExp | string | string[])[] | RegExp | string;

export interface ShowIndexType {
  [key: string]: boolean;
}
export interface SelectedType {
  day: number | string;
  formatValue?: string;
  month: string;
  year: number;
}
export interface VjlHeaderProps extends Partial<VjlYearProps> {
  onlyDay: boolean;
  onlyMonth: boolean;
  selectedYear: SelectedType['year'];
}

export interface VjlNavigationProps extends VjlHeaderProps {
  onlyDay: boolean;
  selectedMonth: SelectedType['month'];
}

export interface VjlYearProps {
  inValidDates: Boundary;
  onlyYear: boolean;
  selectedYear: SelectedType['year'];
}

export interface VjlMonthProps extends Partial<VjlYearProps> {
  inValidDates: Boundary;
  onlyMonth: boolean;
  selectedMonth: SelectedType['month'];
}
export interface VjlDayProps extends Partial<VjlMonthProps>, Partial<VjlYearProps> {
  currentValue?: SelectedType;
  holidays: Boundary;
  initialDate: Boundary;
  inValidDates: Boundary;
  max: boolean | undefined;
  min: boolean | undefined;
  onlyCurrentMonthDays: boolean | undefined;
  range: boolean | undefined;
  rangeDate: [] | [string, string] | undefined;
  selectedDay: number | string;
  selectedMonth: SelectedType['month'];
  selectedYear: SelectedType['year'];
  weekend: number | number[];
}
export interface DateType {
  Props: Date | dayjs.Dayjs | null | number | string | undefined;
}

export interface DayjsType extends Dayjs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calendar: any;
}
dayjs.extend(jalali);
extend(weekday);
extend(localeData);
extend(isBetween);

const weekMapping: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 0,
};
//
const date = (value: DateType['Props']) =>
  (dayjs(value) as DayjsType).calendar('jalali').locale('fa');
const monthList = jmonth.jmonths;
const weekDays = fa.weekdaysMin;
const weekArray1 = fa.weekdaysMin?.slice(fa.weekStart);
const weekArray2 = fa.weekdaysMin?.slice(0, fa.weekStart);
const faWeekDays = weekArray1?.concat(weekArray2 as ConcatArray<string> | string);
const weekArrayFull1 = fa.weekdays?.slice(fa.weekStart);
const weekArrayFull2 = fa.weekdays?.slice(0, fa.weekStart);
const faWeekDaysFull = weekArrayFull1?.concat(weekArrayFull2 as ConcatArray<string> | string);
const startYear = date(new Date()).get('year') - 15;
const endYear = date(new Date()).get('year') + 5;
const yearList: number[] = [];
for (let year = startYear; year <= endYear; year++) {
  yearList.push(year);
}
//
const firstDayOfMonthJalali = (value: DateType['Props']) => {
  const faFirstDay = +moment(value as Date, 'jYYYY-jM-jDD')
    .startOf('jMonth')
    .locale('en')
    .format('d');
  const gridLayoutStart = weekMapping[faFirstDay];

  return gridLayoutStart;
};
//
function isPersianLeapYear(persianYear: number) {
  const matches = [1, 5, 9, 13, 17, 22, 26, 30];
  const modulus = persianYear % 33;

  return matches.includes(modulus);
}
//
const daysInMonth = (year: number, month: number) => {
  const leap = isPersianLeapYear(year);
  if (month <= 6) {
    return 31;
  } else if (month <= 11) {
    return 30;
  } else {
    return leap ? 30 : 29;
  }
};
// compare current date
const compareDate = (year: number, month: number, day?: number, weekName?: string) => {
  let dayValue = false;
  let monthValue = false;
  let yearValue = false;
  let weekValue = false;
  const nowDay = moment().locale('en').format('jYYYY/jM/jD');
  const nowMonth = moment().locale('en').format('jYYYY/jM');
  const nowYear = moment().locale('en').format('jYYYY');
  const nowWeek = moment().locale('en').format('jdd');
  const inputDay = `${year}/${month}/${day}`;
  const inputMonth = `${year}/${month}`;
  const inputYear = `${year}`;
  const inputWeek = `${weekName}`;
  if (inputDay === nowDay) {
    dayValue = true;
  }
  if (inputMonth === nowMonth) {
    monthValue = true;
  }
  if (inputYear === nowYear) {
    yearValue = true;
  }
  if (inputWeek === nowWeek) {
    if (monthValue) {
      weekValue = true;
    }
  }

  return { dayValue, monthValue, weekValue, yearValue };
};
//
const valueToDate = (v: string, format = 'YYYY-MM-DD HH:mm:ss') =>
  moment(v, 'jYYYY-jMM-jDD HH:mm:ss').locale('en').format(format) as unknown as DayjsType;
//
const isIncludeRange = (currentDate: string, startDate: string, endDate: string) => {
  const current = valueToDate(currentDate);

  return dayjs(current).isBetween(startDate, endDate, 'day');
};
//
const signleDateHandler = (mapper: string, value: string) => {
  let finalValue = false;
  const rgx = (mapper as unknown) instanceof RegExp;
  if (rgx) {
    finalValue = (mapper as unknown as RegExp).test(value);
  } else {
    finalValue = valueToDate(mapper) === valueToDate(value);
  }

  return finalValue ? true : false;
};
//
const rangeDateHandler = (mapper: (string | string[])[], value: string) => {
  let finalValue = false;
  const valueDate = valueToDate(value);
  for (const el in mapper) {
    const arr = Array.isArray(mapper[el]);
    const rgx = (mapper[el] as unknown) instanceof RegExp;
    if (!arr) {
      if (rgx) {
        finalValue = (mapper[el] as unknown as RegExp).test(value);
      } else {
        finalValue = valueToDate(String(mapper[el])) === valueDate;
      }
    } else {
      const errElement = [valueToDate(mapper[el][0]), valueToDate(mapper[el][1])];
      const sortedRange = errElement.sort();
      if (valueDate >= sortedRange[0] && valueDate <= sortedRange[1]) {
        finalValue = true;
      }
    }
  }

  return finalValue;
};
//
const dateBoundaryHandler = (mapper: (string | string[])[], value: string) => {
  let finalValue = false;
  const arrMapper = Array.isArray(mapper);
  if (!arrMapper) {
    if (signleDateHandler(mapper, value)) {
      finalValue = true;
    }
  }
  if (arrMapper) {
    const singleCompare = [];
    for (const el in mapper) {
      const arr = Array.isArray(el);
      if (!arr) {
        singleCompare.push(mapper[el]);
      } else {
        singleCompare.push(mapper[el][0]);
        singleCompare.push(mapper[el][1]);
      }
    }
    if (rangeDateHandler(singleCompare, value)) {
      finalValue = true;
    }
  }

  return finalValue;
};
// ----------------------------------------------
const rangeInitialHandler = (mapper: (string | string[])[], value: string) => {
  let finalValue = false;
  const arrValue = [];
  const valueDate = valueToDate(value);
  for (const el in mapper) {
    const arr = Array.isArray(mapper[el]);
    const rgx = (mapper[el] as unknown) instanceof RegExp;
    if (!arr) {
      if (rgx) {
        finalValue = (mapper[el] as unknown as RegExp).test(value);
      } else {
        finalValue = valueToDate(String(mapper[el])) === valueDate;
        arrValue.push(valueToDate(String(mapper[el])));
      }
    }
  }

  return { arrValue, finalValue };
};
//
const initialRangeHandler = (mapper: (string | string[])[], value: string) => {
  let dateValue;
  const arrMapper = Array.isArray(mapper);
  if (arrMapper) {
    const singleCompare = [];
    for (const el in mapper) {
      const arr = Array.isArray(el);
      if (!arr) {
        singleCompare.push(mapper[el]);
      } else {
        singleCompare.push(mapper[el][0]);
        singleCompare.push(mapper[el][1]);
      }
    }
    const { arrValue, finalValue } = rangeInitialHandler(singleCompare, value);
    if (finalValue && typeof finalValue === 'boolean') {
      dateValue = true;
    }
    if (arrValue.length > 1) {
      dateValue = arrValue;
    }
  }

  return dateValue;
};
//
const initialDateHandler = (value: string) => {
  let day = /^\d{4}\/\d{2}\/\d{2}$/.test(value)
    ? moment(value, 'jYYYY/jM/jD').locale('en').format('jDD')
    : moment(value).locale('en').format('jDD');
  let month = (dayjs(value, { jalali: true } as unknown as string) as DayjsType)
    .calendar('jalali')
    .locale('fa')
    .format('MMMM');
  let year = (dayjs(value, { jalali: true } as unknown as string) as DayjsType)
    .calendar('jalali')
    .locale('fa')
    .format('YYYY');

  if (
    value &&
    isPersianLeapYear(Number(dayjs(value).format('YYYY'))) &&
    dayjs(value).format('DD') === '30' &&
    dayjs(value).format('MM') === '12'
  ) {
    month = (
      dayjs(`${dayjs(value).format('YYYY')}/${dayjs(value).format('MM')}/01`, {
        jalali: true,
      } as unknown as string) as DayjsType
    )
      .calendar('jalali')
      .locale('fa')
      .format('MMMM');
    year = dayjs(value).format('YYYY');
    day = '30';
  }

  return { day, month, year };
};
// expose date with custom format
const exposer = (values: SelectedType, format: string) => {
  let formatValue = '';
  const indexOfMonth = () => monthList.indexOf(values.month) + 1;
  if (isPersianLeapYear(values.year) && indexOfMonth() === 12 && values.day == '30') {
    formatValue = `${values.year}/${indexOfMonth()}/${values.day}`;
  } else {
    formatValue = (
      dayjs(`${values.year}/${indexOfMonth()}/${values.day == 0 ? 1 : values.day}`, {
        jalali: true,
      } as unknown as string) as DayjsType
    )
      .calendar('jalali')
      .locale('fa')
      .format(format);
  }

  return {
    ...values,
    formatValue,
    numberOfMonth: indexOfMonth(),
  };
};
// expose date with custom format
const rangeExposer = (valuesArray: SelectedType[], format: string) => {
  const exposedDates = valuesArray.map(values => exposer(values, format));

  return exposedDates;
};
//
const weekendHandler = (weekend: number | number[], value: number) => {
  const weekendType = Array.isArray(weekend);
  if (weekendType) {
    return weekend.includes(value);
  }

  return weekend === value;
};
const weekendDayHandler = (weekend: number | number[], value: string) => {
  const weekendType = Array.isArray(weekend);
  const formatValue = (
    dayjs(value, {
      jalali: true,
    } as unknown as string) as DayjsType
  )
    .calendar('jalali')
    .locale('fa')
    .format('d');
  const weekDay = weekMapping[formatValue];
  if (weekendType) {
    return weekend.includes(weekDay + 1);
  }

  return weekend === weekDay + 1;
};
const dateToWeek = (value: string) =>
  (
    dayjs(value, {
      jalali: true,
    } as unknown as string) as DayjsType
  )
    .calendar('jalali')
    .locale('fa')
    .format('dddd');
export const useDate = () => ({
  compareDate,
  date,
  dateBoundaryHandler,
  dateToWeek,
  dayjs,
  daysInMonth,
  exposer,
  faWeekDays,
  faWeekDaysFull,
  firstDayOfMonthJalali,
  initialDateHandler,
  initialRangeHandler,
  isIncludeRange,
  monthList,
  rangeExposer,
  valueToDate,
  weekDays,
  weekendDayHandler,
  weekendHandler,
  yearList: yearList.slice().reverse(),
});
