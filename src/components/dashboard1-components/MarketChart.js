import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Bitcoin',
        data: [40000, 42000, 45000, 47000, 46000, 48000, 50000],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Ethereum',
        data: [1500, 1600, 1700, 1800, 1750, 1850, 2000],
        fill: false,
        borderColor: '#742774',
      },
    ],
  };
  
  export default function MarketChart() {
    return (
      <div>
        <h3>MarketChart</h3>
        <Line data={data} />
      </div>
    );
  }
  