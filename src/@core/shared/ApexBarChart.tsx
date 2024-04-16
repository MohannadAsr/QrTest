import { RootState } from '@src/store/store';
import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ApexBarChart = ({ data }) => {
  const { mode } = useSelector((state: RootState) => state.App);

  const chartData = React.useMemo<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexCharts.ApexOptions;
  }>(() => {
    return {
      series: data,
      options: {
        chart: {
          background: mode === 'dark' ? '#333' : '#fff',
          type: 'bar',
          toolbar: {
            tools: {
              download: false,
            },
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            isFunnel3d: true,
            barHeight: '100%',
          },
        },
        dataLabels: {
          enabled: true,
        },
        yaxis: {
          title: {
            text: 'Komplette Anzahl',
          },
        },
        xaxis: {
          categories: [
            'Jan.',
            'Feb.',
            'Mär.',
            'Apr.',
            'Mai',
            'Jun.',
            'Jul.',
            'Aug.',
            'Sep.',
            'Okt.',
            'Nov.',
            'Dez.',
          ],
        },
        colors: ['#58005d', '#824485', '#ef4444'],
        theme: {
          mode: mode,
          palette: mode,
          monochrome: {
            enabled: false,
          },
        },
      },
    };
  }, [mode, data]);

  if (!data) return <></>;

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="350"
      />
    </div>
  );
};

export default ApexBarChart;
