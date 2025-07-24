// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// const Card = ({imgSrc,title, startTime,endTime,statingBid,id}) => {
//     const calculateTimeLeft =()=>{
//         const now = new Date();
//         const startDifferent = new Date(startTime) - now;
//         const endDifferent = new Date(endTime) -now;
//         let timeLeft = {} ;

//         if(startDifferent > 0){
//             timeLeft={
//                 type:"Starts In:",
//                 days: Math.floor  (startDifferent /( 1000 * 60 * 60 * 24)),
//                 hours: Math.floor  ((startDifferent /( 1000 * 60 * 60)) % 24),
//                 minutes:Math.floor ((startDifferent / 1000 / 60) % 60),
//                 seconds:Math.floor ((startDifferent / 1000  ) % 60)
//             };
//         }else if(endDifferent >0){
//             timeLeft={
//                 type:"Ends In:",
//                days:Math.floor(endDifferent /(1000 * 60 * 60 * 24)),
//                hours:Math.floor((endDifferent /(1000 * 60 * 60) % 24)),
//                minutes:Math.floor((endDifferent / 1000 * 60 ) % 60),
//                seconds:Math.floor((endDifferent / 1000 )% 60)

//             }
//         }
//         return timeLeft;
//     }

//     const [timeLeft,setTimeLeft] = useState(calculateTimeLeft());

//     useEffect(()=>{
//         const timer = setTimeout(() => {
//             setTimeLeft(calculateTimeLeft())
//         })
//         return () => clearTimeout(timer);
//     },[timeLeft]);

//     const formatTimeLeft = ({days, hours,minutes,seconds})=>{
//     const pad = num=> String(num).padStart(2,'0');
//         return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
//     } 
     
//   return (
//     <>

//      <Link
//        to={`/auction/item/${item._id}`}
//        className="flex flex-col bg-white rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 max-w-sm"
//      >
//        <img
//          src={imgSrc}
//          alt={title}
//          className="w-full aspect-[4/3] object-cover rounded-md mb-4"
//        />
//     <div className="px-2 pt-2 pb-2">
//      <h5 className="text-gray-800 text-lg font-semibold mb-2">{title}</h5>
//        {statingBid && (
//          <p className="text-sm text-gray-600 mb-1">
//            Starting Bid:{' '}
//            <span className="text-red-500 font-bold">${statingBid}</span>
//          </p>
//        )}

//        <p className="text-sm text-gray-700">
//          {timeLeft.type}
//         {Object.keys(timeLeft).length > 1 ? (
//             <span className='text-gray-400 font-semibold'>
//                 {formatTimeLeft}</span>
//             ):(
//             <span className='text-red-400 font-medium'>Time's up</span>
//             )}
//             </p>
        
//         </div>
//      </Link>
   
//     </>
//   )
// }

// export default Card


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ imgSrc, title, startTime, endTime, statingBid,id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;
    let timeLeft = {};

    if (startDiff > 0) {
      timeLeft = {
        type: 'Starts In:',
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / (1000 * 60)) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      timeLeft = {
        type: 'Ends In:',
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / (1000 * 60)) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // every second

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
     to={`/auction/item/${id}`}
      className="flex flex-col bg-white rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 max-w-sm"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full aspect-[4/3] object-cover rounded-md mb-4"
      />

      <div className="px-2 pt-2 pb-2">
        <h5 className="text-gray-800 text-lg font-semibold mb-2">{title}</h5>

        {statingBid && (
          <p className="text-sm text-gray-600 mb-1">
            Starting Bid:{' '}
            <span className="text-red-500 font-bold">${statingBid}</span>
          </p>
        )}

        <p className="text-sm text-gray-700">
          {timeLeft?.type}{' '}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-gray-400 font-semibold">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-red-400 font-medium">Time's up</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Card;
