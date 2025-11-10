
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ imgSrc, title, startTime, endTime, statingBid, id, }) => {
  const {user} = useSelector(state=>state.user)
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition duration-300 w-full h-full max-w-sm min-h-[420px]">
      {/* Auction Image */}
      <div className="w-full h-48 flex items-center justify-center mb-4">
        <img
          src={imgSrc}
          alt={title}
          className="max-h-full max-w-full object-contain rounded-md"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow px-2 pt-2 pb-2">
        {/* Title */}
        <h5 className="text-gray-800 text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </h5>

       <div className="flex justify-between items-center mb-3">
  {/* Starting Bid */}
  {statingBid && (
    <p className="text-sm text-gray-600">
      Starting Bid:{' '}
      <span className="text-red-600 font-bold">${statingBid}</span>
    </p>
  )}

  {/* Timer */}
  <p className="text-sm text-gray-700">
    {timeLeft?.type}{' '}
    {Object.keys(timeLeft).length > 1 ? (
      <span className="text-gray-400 font-semibold">
        {formatTimeLeft(timeLeft)}
      </span>
    ) : (
      <span className="text-red-600 font-medium">Time's up</span>
    )}
  </p>
</div>
        {/* Place Bid Button */}
        <Link
          to={`/auction/item/${id}`}
          className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white text-center py-2 px-4 rounded-md transition-all text-sm font-medium"
        >
          Place Bid
        </Link>
      </div>
    </div>
  );
};

export default Card;
