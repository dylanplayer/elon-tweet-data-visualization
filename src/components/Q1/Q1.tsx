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
    <>
      <h1>Do tweets with certain lengths get more likes than others?</h1>
      <Line data={data} options={options} />
    </>
  );
}

export default Q1;
