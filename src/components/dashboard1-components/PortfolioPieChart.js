import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Pie } from 'react-chartjs-2';
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );
  
  const data = {
    labels: ['Bitcoin', 'Ethereum', 'Cardano', 'Solana'],
    datasets: [
      {
        label: 'Portfolio Allocation',
        data: [50, 30, 10, 10], // Example allocation
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };
  
  export default function PortfolioPieChart() {
    return (
      <div>
        <h3>Portfolio Allocation</h3>
        <Pie data={data} />
      </div>
    );
  }
  