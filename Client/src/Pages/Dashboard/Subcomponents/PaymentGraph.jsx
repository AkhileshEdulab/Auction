import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);
  const revenueData = Array.isArray(monthlyRevenue) && monthlyRevenue.length === 12
    ? monthlyRevenue
    : new Array(12).fill(0);

  const data = {
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],

    datasets: [
      {
        label: 'Monthly Payment Received',
        data: revenueData,  
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 50000,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Total Payments Received",
      },
    },
  };

  return (
   <>
     <div className="w-full h-96 sm:h-[28rem] md:h-[36rem] relative">
      <Bar
        data={data}
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false,
        }}
        // Do NOT set height or width here
      />
    </div>
    
    <style jsx>{`
      /* Force the canvas to take full size of parent */
      div > canvas {
        width: 100% !important;
        height: 100% !important;
      }
    `}</style>
      </>
  );
};

export default PaymentGraph;
