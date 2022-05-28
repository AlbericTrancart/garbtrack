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
  const notRecyclableGradient = context.chart.ctx.createLinearGradient(
    0,
    yAxis.getPixelForValue(start),
    0,
    yAxis.getPixelForValue(end),
  );
  notRecyclableGradient.addColorStop(0, color1);
  notRecyclableGradient.addColorStop(1, color2);

  return notRecyclableGradient;
};

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

      return formatDate(localDate, 'MMMM', intl.locale);
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
  };

  return (
    <section>
      <Subtitle>
        <FormattedMessage id="pages.home.chart.title" />
      </Subtitle>
      <ChartContainer className="mtop">
        <Bar data={data} options={options} />
      </ChartContainer>
    </section>
  );
};
