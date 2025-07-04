<template>
  <div>
    <apexchart
      v-if="resolveData.series"
      :key="resolveData.series"
      ref="chartRef"
      :class="[
        { 'month-sparate-ticks': xType === 'month' },
        { 'week-sparate-ticks': xType === 'week' },
        { 'day-sparate-ticks': xType === 'day' },
      ]"
      :height="height"
      type="area"
      :options="options"
      :series="resolveData.series"
    ></apexchart>
  </div>
</template>
<script setup lang="ts">
import { useChartOption } from '@/composables/dashboard/useChartOption';

// Define interfaces for the data structures
interface DataPoint {
  x: string;
  y: number | null;
}

interface Series {
  name: string;
  data: DataPoint[];
}

interface Props {
  seriesData: Series[];
  xType: string;
  height: string;
}

const { options, hour, dayName, dayNumber } = useChartOption();
const chartRef = ref();
const props = withDefaults(defineProps<Props>(), {
  xType: 'day',
  height: '284',
});
const { seriesData, xType } = toRefs(props);
const resolveData = computed(() => {
  /**
   * detect each index length
   * --------------------------------------
   */
  const lengths: number[] = [];
  if (seriesData.value.length) {
    seriesData.value.forEach(s => {
      lengths.push(s.data.length);
    });
  }

  /**
   * find longer length index
   * --------------------------------------
   */
  const longestLength = lengths.indexOf(Math.max(...lengths));
  /**
   * Create categories based on
   * the longer array
   * --------------------------------------
   */
  const category: string[] = [];
  seriesData.value[longestLength].data.forEach((x: DataPoint) => {
    category.push(x.x);
  });

  /**
   * Create new series without
   * categories
   * --------------------------------------
   */
  const series: { name: string; data: (number | null)[] }[] = [];
  seriesData.value.forEach((s: Series, index: number) => {
    series[index] = {
      name: s.name,
      data: [],
    };
    s.data.forEach((sData: DataPoint) => {
      series[index].data.push(sData.y);
    });
  });

  /**
   * Make all data lengths equal
   * --------------------------------------
   */
  series.forEach(s => {
    const diffNum = lengths[longestLength] - s.data.length;
    if (s.data.length < lengths[longestLength]) {
      for (let i = diffNum; i > 0; i -= 1) {
        s.data.push(null);
      }
    }
  });

  return { category, series };
});
const xaxisFormatter = (value: string): string => {
  let result = '';
  const day = xType.value === 'day';
  const week = xType.value === 'week';
  const month = xType.value === 'month';
  if (day) {
    result = hour(value);
  }
  if (week) {
    result = dayName(value);
  }
  if (month) {
    result = dayNumber(value);
  }

  return result;
};
const handleConfigOption = () => {
  // moment.loadPersian({ dialect: 'persian-modern' });
  if (chartRef.value?.updateOptions && resolveData.value.category) {
    chartRef.value.options.xType = xType.value;
    chartRef.value.options.categories = resolveData.value.category;
    chartRef.value.options.colors = ['#EEEEF1', '#0A33FF'];
    chartRef.value.options.legend = { show: xType.value === 'day' };
    chartRef.value.options.markers = {
      size: 3,
      hover: { size: 5 },
    };
    chartRef.value.options.xaxis = {
      crosshairs: { show: false },
      tooltip: { enabled: false },
      categories: resolveData.value.category,
      labels: {
        trim: false,
        rotate: 0,
        hideOverlappingLabels: false,
        formatter: xaxisFormatter,
      },
    };
  }
};

watch(xType, handleConfigOption);
onMounted(handleConfigOption);
</script>

<style lang="scss">
.apexcharts-canvas {
  direction: rtl;

  > svg {
    @apply overflow-visible;

    > foreignObject {
      @apply overflow-visible;
    }
  }
}

.apexcharts-gridline,
.apexcharts-xaxis-tick {
  @apply stroke-border dark:stroke-border-dark;
}

.apexcharts-xaxis {
  > line {
    @apply stroke-border dark:stroke-border-dark;
  }
}

.month-sparate-ticks {
  .apexcharts-xaxis-label {
    @apply hidden;

    &:nth-of-type(5n),
    &:nth-of-type(1) {
      @apply block;
    }
  }
}

.week-sparate-ticks {
  .apexcharts-xaxis-label {
    @apply hidden md:block;

    &:nth-of-type(odd) {
      @apply block;
    }
  }
}

.day-sparate-ticks {
  .apexcharts-xaxis-label {
    @apply hidden;

    &:nth-of-type(1),
    &:nth-of-type(5),
    &:nth-of-type(9),
    &:nth-of-type(13),
    &:nth-of-type(17),
    &:nth-of-type(21) {
      @apply block;
    }
  }
}

.apexcharts-xaxis-texts-g {
  .apexcharts-text {
    @apply fill-text-soft dark:fill-text-dark-soft;
  }
}

.apexcharts-legend {
  @apply flex flex-row-reverse justify-end gap-xl #{!important};

  &-series {
    display: flex !important;
    @apply flex-row gap-2xs items-center text-caption-400-c1 font-medium ml-0 #{!important};

    .apexcharts-legend-text {
      @apply text-text-soft dark:text-text-dark-soft #{!important};
    }
  }

  &-marker {
    @apply w-xs h-xs #{!important};
  }
}

.no-legend {
  .apexcharts-legend {
    @apply hidden;
  }
}

.apexcharts-tooltip {
  .c-t {
    @apply flex flex-col text-right gap-sm text-caption-400-c1 font-normal;
    @apply p-sm rounded-sm min-w-[140px];
    @apply bg-surface-dark dark:bg-surface dark:text-text text-text-dark;

    .series {
      @apply flex flex-col gap-sm;

      .serie {
        @apply flex flex-col gap-xs;

        .title {
          @apply flex items-center gap-2xs;
          @apply text-text-dark-soft dark:text-text-soft;

          > span {
            @apply w-xs h-xs rounded-circle block bg-secondary;
          }
        }
      }
    }
  }
}

.apexcharts-tooltip-marker {
  background: #000;
}

.apx-legend-position-bottom {
  overflow: hidden !important;
  padding: 0 10px 10px 0 !important;
  bottom: -16px !important;
}

div.apexcharts-canvas::before {
  content: ' ';
  width: calc(100% - 45px);
  @apply bg-border-divider absolute left-[21px] top-[28px] h-[1px] dark:bg-border-dark-divider;
}
.apexcharts-svg {
  margin-right: 6px;
}
</style>
