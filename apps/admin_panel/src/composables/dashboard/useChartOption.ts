import moment from 'moment-jalaali';

export const useChartOption = () => {
  moment.loadPersian();
  const month = (date: string): string => moment(date).format('jMMMM');
  const hour = (date: string): string => moment(date).format('HH:mm');
  const dayName = (date: string): string => moment(date).format('dddd');
  const dayNumber = (date: string): string => moment(date).format('D');
  const { numberFormat } = useMath();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function generateSeries(w: any, dataPointIndex: number) {
    return w.globals.series
      .map((i: number[], index: number) =>
        i[dataPointIndex] !== null
          ? `
          <div class="serie">
            <span class="title">
              <span style="background-color: ${w.globals.fill.colors[index]}"></span>
              ${w.globals.seriesNames[index]}
            </span>
            <span>
              ${numberFormat(i[dataPointIndex] ?? 0)}
              ریال
            </span>
          </div>
          `
          : null
      )
      .join(' ');
  }
  const options = {
    chart: {
      fontFamily: 'IRANYekanXVF',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0,
        stops: [0, 100],
        type: 'vertical',
      },
    },
    grid: {
      position: 'back',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetY: 24,
      position: 'bottom',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      custom({ dataPointIndex, w }: unknown) {
        moment.loadPersian();
        const date = w.config.categories[dataPointIndex];
        const { xType } = w.config;

        return `
              <div class="c-t">
                ${
                  xType === 'day'
                    ? `<div>${hour(date)}</div>`
                    : xType === 'week'
                    ? `<div>${dayName(date)}</div>`
                    : `<div>${dayNumber(date) + ' ام'}</div>`
                }
                <div class="series">
                   ${generateSeries(w, dataPointIndex)}
                </div>
              </div>
            `;
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  return {
    dayName,
    dayNumber,
    hour,
    month,
    options,
  };
};
