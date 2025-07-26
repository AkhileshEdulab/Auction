import React from 'react'
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
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

// Register required components for chart.js
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


const UserGraph = () => {
    const {totalAuctioneers,totalBidders} = useSelector(state=>state.superAdmin);
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
            label: 'Number of Bidder',
            data: totalBidders,
            backgroundColor: 'rgba(254, 162, 235, 0.6)',
            fill:false
          },
           {
            label: 'Number of Auctioneer',
            data: totalAuctioneers,
            backgroundColor: 'rgba(254, 185, 2, 0.6)',
            fill:false
          },
        ],
      };
    
      const options = {
        scales:{
          y:{
              beginAtZero:true,
              max:50,
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
                text:"Number of Bidders and Auctioneers Registered",
            }
        }
      };
  return (
   <Line data={chartData} options={options}/>
  )
}

export default UserGraph;