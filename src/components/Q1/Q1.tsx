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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const Q1 = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Elon Musk Tweets: length v. likes',
      },
    },
  };
  
  const labels = lengths;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Likes',
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

export default Q1;
