export const breakpoint = {
  lg: 992,
  md: 768,
  sm: 640,
  xl: 1200,
  xs: 320,
  xxl: 1456,
};

export default function () {
  const debouncedWidth = ref(0);
  let widthTimeout: NodeJS.Timeout | null | number | string | undefined = null;
  const width = computed({
    get: () => debouncedWidth.value,
    set: val => {
      if (widthTimeout) clearTimeout(widthTimeout);
      widthTimeout = setTimeout(() => {
        debouncedWidth.value = val;
      }, 20);
    },
  });
  const updateSize = () => {
    width.value = window.innerWidth;
  };
  onMounted(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });
  // onBeforeUnmount(() => {
  //   window.removeEventListener('resize', updateSize);
  // });

  const xs = computed(() => width.value < breakpoint.xs);
  const sm = computed(() => width.value < breakpoint.sm);
  const lg = computed(() => width.value < breakpoint.lg);
  const md = computed(() => width.value < breakpoint.md);
  const xl = computed(() => width.value < breakpoint.xl);
  const xxl = computed(() => width.value < breakpoint.xxl);

  return {
    breakpoint,
    lg,
    md,
    sm,
    windowSize: width,
    xl,
    xs,
    xxl,
  };
}
