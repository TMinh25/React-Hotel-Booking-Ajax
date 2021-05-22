import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import Title from './Components/Title';
import { Bar } from 'react-chartjs-2';

const StatisticTab = props => {
  const chartData = useSelector(state => state.statistic.chartData);
  const data = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        type: 'bar',
        label: 'Thu Nhập Tháng',
        yAxisID: 'y',
        data: chartData.map(item => item.data.income),
      },
      {
        type: 'line',
        label: 'Số Lượng Khách',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        yAxisID: 'y1',
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
};

export default StatisticTab;
