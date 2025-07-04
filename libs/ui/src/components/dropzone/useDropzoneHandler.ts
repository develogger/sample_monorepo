function bytesToMegabytes(bytes: number) {
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  if (Math.round(megabytes) > 1) {
    return Math.round(megabytes) + ' مگابایت';
  } else {
    return Math.round(kilobytes) + ' کیلوبایت';
  }
}

export const errorHandler = (code: boolean | string, size?: number) => {
  switch (code) {
    case 'file-too-large':
      return ` حداکثر سایز مجاز ${size && bytesToMegabytes(size)} میباشد`;
    case 'file-too-small':
      return 'سایز فایل انتخاب شده کمتر از حد مجاز است';
    case 'too-many-files':
    case 'max-files':
      return 'تعداد فایل آپلود شده بیش از حد مجاز است';
    case 'file-invalid-type':
      return 'فرمت فایل انتخاب شده مجاز نیست';
    case 'upload-failed':
      return 'مشکلی در آپلود فایل به وجود آمده است، دوباره تلاش کنید';

    default:
      return;
  }
};
