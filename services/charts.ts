import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fonts } from 'stylesheet';

let chartConfigInitialized = false;

export const initChartConfig = () => {
  if (chartConfigInitialized) {
    return;
  }

  ChartJS.register(LinearScale, CategoryScale, BarController, BarElement, ChartDataLabels, Legend);
  ChartJS.defaults.font.family = fonts.main;
  ChartJS.defaults.font.size = 16;
  ChartJS.defaults.plugins.legend.position = 'bottom';
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.pointStyle = 'rectRounded';
  chartConfigInitialized = true;
};
