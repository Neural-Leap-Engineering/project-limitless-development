import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChartComponent = ({ data, id }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy existing chart instance
    }
    chartRef.current = new Chart(document.getElementById(id), {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chartRef.current.destroy(); // Cleanup on component unmount
    };
  }, [data, id]);

  return <canvas id={id} />;
};

export default BarChartComponent;
