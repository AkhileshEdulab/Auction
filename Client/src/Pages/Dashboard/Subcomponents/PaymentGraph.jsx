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
  plugins,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// Register required components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,+
  PointElement
);

const PaymentGraph = () => {
  const { totalMonthlyRevenue } = useSelector((state) => state.superAdmin);

 
  const chartData = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [
      {
        label: 'Monthly Payment Received',
        data: totalMonthlyRevenue,
        backgroundColor: 'rgba(254, 162, 235, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    scales:{
      y:{
          beginAtZero:true,
          max:50000,
            ticks:{
                callback:function(value){
                    return value.toLocaleString()
                }
            }
        }
    },
    plugins:{
        title:{
            display:true,
            text:"Monthly Total Payments Received",
        }
    }
  };

  return (
    <Bar data={chartData} options={options}/>
  );
};

export default PaymentGraph;
