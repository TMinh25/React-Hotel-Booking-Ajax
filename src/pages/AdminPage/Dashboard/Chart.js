import React from 'react';
import Title from './Title';
import { Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const chartData = useSelector(state => state.statistic.chartData);
  const randIncome = () => Math.round(Math.random() * 30000000);
  const randGuest = () => Math.round(Math.random() * 999);
  const data = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        type: 'bar',
        label: 'Thu Nhập Tháng',
        yAxisID: 'y',
        stepped: 'middle',
        data: chartData.map(item => item.data.income),
      },
      {
        type: 'line',
        label: 'Số Lượng Khách',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        yAxisID: 'y1',
        stepped: 'middle',
        data: chartData.map(item => item.data.guest),
      },
    ],
  };
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'Thu Nhập',
        },
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        ticks: {
          stepSize: 2,
        },
        title: {
          display: true,
          text: 'Số Lượng Khách',
        },
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };
  return (
    <>
      <Paper style={{ padding: 20 }}>
        <Title>Tháng {new Date().getMonth() + 1}</Title>
        <Bar data={data} options={options} />
      </Paper>
    </>
  );
}
