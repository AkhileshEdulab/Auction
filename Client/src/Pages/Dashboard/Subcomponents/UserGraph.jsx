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
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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
              max:10,
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
  return (<>
  <div className="w-full h-96 sm:h-[28rem] md:h-[36rem] relative">
  <Line
    data={chartData}
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
 )
}

export default UserGraph;