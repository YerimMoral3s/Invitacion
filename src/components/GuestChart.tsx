import React from 'react';
import { Chart, registerables } from 'chart.js';

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const Div = styled.div`
  margin: 0 0 2rem 0;
`;

type GuestChartProps = {
  labels: string[];
  datas: number[];
};

const GuestChart: React.FC<GuestChartProps> = ({ labels, datas }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total',
        data: datas,
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Div>
      <Bar data={data} options={options} />
    </Div>
  );
};

export default GuestChart;
