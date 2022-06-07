import React from 'react';
import './App.css';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2';

import likes from './likes.json';
import lengths from './lengths.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function App() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Elon Musk Tweets',
      },
    },
  };
  
  const labels = lengths;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Tweet Length',
        data: likes,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="App">
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
