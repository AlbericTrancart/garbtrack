import { Subtitle } from 'components/Layout/Layout';
import { GarbageTrackingEntry } from 'services/type';
import { Bar } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { ChartData, ScriptableContext } from 'chart.js';
import { formatDate } from 'services/intl';
import { colorPalette, getSpacing, mobileBreakpoint } from 'stylesheet';
import styled from 'styled-components';

interface Props {
  trackingEntries: GarbageTrackingEntry[];
}

interface EntriesForMonth {
  month: number;
  entries: GarbageTrackingEntry[];
}

const ChartContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 45vw;

  @media (min-width: ${mobileBreakpoint}) {
    width: ${getSpacing(90)};
    height: ${getSpacing(45)};
  }
`;

const groupEntriesByMonth = (entries: GarbageTrackingEntry[]): EntriesForMonth[] => {
  const sortedEntries = orderBy(entries, ['date'], ['asc']);
  const entriesByMonth: EntriesForMonth[] = [];

  let currentMonth: number | null = null;
  let currentMonthEntries: GarbageTrackingEntry[] = [];

  sortedEntries.forEach((entry) => {
    const month = new Date(entry.date).getMonth();
    if (currentMonth !== month) {
      if (currentMonth !== null) {
        entriesByMonth.push({ month: currentMonth, entries: currentMonthEntries });
      }
      currentMonth = month;
      currentMonthEntries = [];
    }
    currentMonthEntries.push(entry);
  });
  if (currentMonth !== null) {
    entriesByMonth.push({ month: currentMonth, entries: currentMonthEntries });
  }

  return entriesByMonth;
};

const getGradient = (
  context: ScriptableContext<'bar'>,
  start: number,
  end: number,
  color1: string,
  color2: string,
) => {
  const yAxis = context.chart.scales['y'];
  const yStart = yAxis.getPixelForValue(start);
  const yEnd = yAxis.getPixelForValue(end);

  // When the legend is built these values may be NaN
  if (!(yStart >= 0 && yEnd >= 0)) {
    return color1;
  }
  const notRecyclableGradient = context.chart.ctx.createLinearGradient(0, yStart, 0, yEnd);
  notRecyclableGradient.addColorStop(0, color1);
  notRecyclableGradient.addColorStop(1, color2);

  return notRecyclableGradient;
};

const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const GarbageChart: React.FC<Props> = ({ trackingEntries }) => {
  const intl = useIntl();
  const groupedEntriesByMonth = groupEntriesByMonth(trackingEntries);
  const notRecyclableData = groupedEntriesByMonth.map((entryByMonth) =>
    entryByMonth.entries.reduce((sum, current) => sum + parseFloat(current.weight), 0),
  );
  const maxNotRecyclableValue = Math.max(...notRecyclableData);
  const recyclableData = groupedEntriesByMonth.map((entryByMonth) =>
    entryByMonth.entries.reduce((sum, current) => sum + parseFloat(current.weight), 0),
  );
  const maxRecyclableValue = Math.max(...recyclableData);

  const data: ChartData<'bar'> = {
    datasets: [
      {
        type: 'bar',
        label: intl.formatMessage({ id: 'pages.home.chart.weigthLabel' }),
        data: notRecyclableData,
        maxBarThickness: 50,
        backgroundColor: (context) =>
          getGradient(
            context,
            0,
            maxNotRecyclableValue,
            colorPalette.darkFushia,
            colorPalette.darkPurple,
          ),
      },
      {
        type: 'bar',
        label: intl.formatMessage({ id: 'pages.home.chart.weigthRecyclableLabel' }),
        data: recyclableData,
        maxBarThickness: 50,
        backgroundColor: (context) =>
          getGradient(
            context,
            maxNotRecyclableValue,
            maxNotRecyclableValue + maxRecyclableValue,
            colorPalette.lightGreen,
            colorPalette.darkGreen,
          ),
      },
    ],
    labels: groupedEntriesByMonth.map((entryByMonth) => {
      const localDate = new Date();
      localDate.setMonth(entryByMonth.month);

      return capitalizeFirstLetter(formatDate(localDate, 'MMMM', intl.locale));
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
    plugins: {
      datalabels: {
        color: colorPalette.white,
        anchor: 'end',
        align: 'bottom',
        font: { weight: 'bold' },
      },
    },
  };

  return (
    <section>
      <Subtitle>
        <FormattedMessage id="pages.home.chart.title" />
      </Subtitle>
      <ChartContainer className="mtop">
        {/* @ts-expect-error cannot turn off warning about plugin wrong type */}
        <Bar data={data} options={options} />
      </ChartContainer>
    </section>
  );
};
