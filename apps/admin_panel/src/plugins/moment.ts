import momentJ from 'moment-jalaali';

export default defineNuxtPlugin(() => {
  momentJ.updateLocale('fa', {
    jMonths: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'تتتتت',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
  });
  momentJ.locale('fa');

  return {
    name: 'moment',
    provide: {
      relative: () => momentJ(),
    },
  };
});
