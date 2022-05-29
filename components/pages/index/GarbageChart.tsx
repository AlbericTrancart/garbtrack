import { Subtitle } from 'components/Layout/Layout';
import { GarbageTrackingEntry } from 'services/type';
import { Bar } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { ScriptableContext } from 'chart.js';
import { formatDate } from 'services/intl';
import { colorPalette, getSpacing, mobileBreakpoint, typography } from 'stylesheet';
import styled from 'styled-components';
import { Link } from 'components/Link/Link';

const FRENCH_MEAN_WASTE_PER_MONTH = 48;

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
  min-height: 300px;

  @media (min-width: ${mobileBreakpoint}) {
    width: ${getSpacing(90)};
    height: ${getSpacing(45)};
  }
`;

const MeanExplanationContainer = styled.p`
  ${typography.small}
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

const getBarGradient = (
  context: ScriptableContext<'bar'>,
  start: number,
  end: number,
  color1: string,
  color2: string,
) => {
  // When the legend is built the values are NaN
  // eslint-disable-next-line
  if (!context.chart.chartArea) {
    return color1;
  }

  const yAxis = context.chart.scales['y'];
  const yStart = yAxis.getPixelForValue(start);
  const yEnd = yAxis.getPixelForValue(end);

  const notRecyclableGradient = context.chart.ctx.createLinearGradient(0, yStart, 0, yEnd);
  notRecyclableGradient.addColorStop(0, color1);
  notRecyclableGradient.addColorStop(1, color2);

  return notRecyclableGradient;
};

const getLineGradient = (context: ScriptableContext<'line'>, color1: string, color2: string) => {
  const chart = context.chart;
  const { ctx, chartArea } = chart;

  // wrong typing from chartjs
  // eslint-disable-next-line
  if (!chartArea) {
    // This case happens on initial chart load
    return null;
  }

  const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  return gradient;
};

const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const GarbageChart: React.FC<Props> = ({ trackingEntries }) => {
  const intl = useIntl();
  const groupedEntriesByMonth = groupEntriesByMonth(trackingEntries);
  const notRecyclableData = groupedEntriesByMonth.map((entryByMonth) =>
    entryByMonth.entries
      .filter((entry) => !entry.recyclable)
      .reduce((sum, current) => sum + parseFloat(current.weight), 0),
  );
  const maxNotRecyclableValue = Math.max(...notRecyclableData);
  const recyclableData = groupedEntriesByMonth.map((entryByMonth) =>
    entryByMonth.entries
      .filter((entry) => entry.recyclable)
      .reduce((sum, current) => sum + parseFloat(current.weight), 0),
  );
  const maxRecyclableValue = Math.max(...recyclableData);
  const months = groupedEntriesByMonth.map((entryByMonth) => entryByMonth.month);
  const MIN_MONTHS_DISPLAYED = 3;
  if (months.length < MIN_MONTHS_DISPLAYED) {
    for (let i = months.length; i < MIN_MONTHS_DISPLAYED; i++) {
      months.push((months[i - 1] + 1) % 12);
    }
  }

  const notRecyclableDataset = {
    type: 'bar',
    label: intl.formatMessage({ id: 'pages.home.chart.weigthLabel' }),
    data: notRecyclableData,
    maxBarThickness: 50,
    backgroundColor: (context: ScriptableContext<'bar'>) =>
      getBarGradient(
        context,
        0,
        maxNotRecyclableValue,
        colorPalette.darkFushia,
        colorPalette.darkPurple,
      ),
    datalabels: {
      display: (context: ScriptableContext<'bar'>) => notRecyclableData[context.dataIndex] > 0,
    },
  };

  const recyclableDataset = {
    type: 'bar',
    label: intl.formatMessage({ id: 'pages.home.chart.weigthRecyclableLabel' }),
    data: recyclableData,
    maxBarThickness: 50,
    backgroundColor: (context: ScriptableContext<'bar'>) =>
      getBarGradient(
        context,
        maxNotRecyclableValue,
        maxNotRecyclableValue + maxRecyclableValue,
        colorPalette.lightGreen,
        colorPalette.darkGreen,
      ),
    datalabels: {
      display: (context: ScriptableContext<'bar'>) => recyclableData[context.dataIndex] > 0,
    },
  };

  const datasets = [];
  if (maxNotRecyclableValue > 0) {
    datasets.push(notRecyclableDataset);
  }
  if (maxRecyclableValue > 0) {
    datasets.push(recyclableDataset);
  }
  datasets.push({
    type: 'line',
    label: intl.formatMessage(
      { id: 'pages.home.chart.meanLabel' },
      { value: FRENCH_MEAN_WASTE_PER_MONTH },
    ),
    data: months.map(() => FRENCH_MEAN_WASTE_PER_MONTH),
    borderColor: (context: ScriptableContext<'line'>) =>
      getLineGradient(context, colorPalette.darkOrange, colorPalette.orange),
    tension: 0.1,
    pointStyle: 'circle',
    pointBackgroundColor: 'transparent',
    pointBorderWidth: 2,
    datalabels: {
      display: false,
    },
  });

  const data = {
    datasets,
    labels: months.map((month) => {
      const localDate = new Date();
      localDate.setDate(1);
      localDate.setMonth(month);

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
        anchor: 'center',
        align: 'center',
        font: { weight: 'bold' },
      },
    },
  };

  return (
    <>
      <section>
        <Subtitle>
          <FormattedMessage id="pages.home.chart.title" />
        </Subtitle>
        <ChartContainer className="mtop">
          {/* @ts-expect-error cannot turn off warning about plugin wrong type */}
          <Bar data={data} options={options} />
        </ChartContainer>
        <MeanExplanationContainer>
          <FormattedMessage
            id="pages.home.chart.meanExplanation"
            values={{ value: FRENCH_MEAN_WASTE_PER_MONTH }}
          />{' '}
          (
          <Link
            as="a"
            target="_blank"
            rel="noreferrer noopener"
            href={intl.formatMessage({ id: 'pages.home.chart.meanSourceLink' })}
          >
            <FormattedMessage id="pages.home.chart.meanSource" />
          </Link>
          )
        </MeanExplanationContainer>
      </section>
      <section>
        <Subtitle>
          <FormattedMessage id="pages.home.actTitle" />
        </Subtitle>
        <p>
          <em>
            <FormattedMessage id="pages.home.actDescription" />
          </em>
        </p>
      </section>
    </>
  );
};
