import { Subtitle } from 'components/Layout/Layout';
import { GarbageTrackingEntry } from 'services/type';
import { Bar } from 'react-chartjs-2';
import { FormattedMessage, useIntl } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { ChartData } from 'chart.js';
import { formatDate } from 'services/intl';

interface Props {
  trackingEntries: GarbageTrackingEntry[];
}

interface EntriesForMonth {
  month: number;
  entries: GarbageTrackingEntry[];
}

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
  console.log({ entries, entriesByMonth });

  return entriesByMonth;
};

export const GarbageChart: React.FC<Props> = ({ trackingEntries }) => {
  const intl = useIntl();
  const groupedEntriesByMonth = groupEntriesByMonth(trackingEntries);

  const data: ChartData<'bar'> = {
    datasets: [
      {
        type: 'bar',
        label: intl.formatMessage({ id: 'pages.home.chart.weigthLabel' }),
        data: groupedEntriesByMonth.map((entryByMonth) =>
          entryByMonth.entries.reduce((sum, current) => sum + parseFloat(current.weight), 0),
        ),
      },
    ],
    labels: groupedEntriesByMonth.map((entryByMonth) => {
      const localDate = new Date();
      localDate.setMonth(entryByMonth.month);

      return formatDate(localDate, 'MMMM', intl.locale);
    }),
  };

  console.log(data);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section>
      <Subtitle>
        <FormattedMessage id="pages.home.chart.title" />
      </Subtitle>

      <Bar data={data} options={options} />
    </section>
  );
};
