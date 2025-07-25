import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ViewCard = ({ imgSrc, title, startTime, endTime, statingBid,id }) => {
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

    const [openDrawer, setOpenDrawer] = useState(false);

  const handleRepublish = (id) => {
    setOpenDrawer(true);
  };

  const handleViewAuction = (id) => {
    navigate(`/auction/details/${id}`);
  };

  const handleDeleteAuction = (id) => {
    console.log('Delete auction', id);
  };
  return (
   <>
    <div
    
      className="flex flex-col bg-white rounded-md p-4 border-b  transition duration-300 max-w-sm"
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


      <div className="mt-4 flex flex-wrap flex-col gap-2">
                  <button
                    // disabled={new Date(element.endTime) > Date.now()}
                    onClick={() => handleRepublish(id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded"
                  >
                    Republish
                  </button>
                  <button
                    onClick={() => handleViewAuction(id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
                  >
                    View Auction
                  </button>
                  <button
                    onClick={() => handleDeleteAuction(id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded"
                  >
                    Delete Auction
                  </button>
      </div>
    </div>
     <RepublishAuction 
      id={id} 
      openDrawer={openDrawer} 
      setOpenDrawer={setOpenDrawer}/>
   </>
  );
};

export default ViewCard;


const RepublishAuction = ({ id, openDrawer, setOpenDrawer }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  return (
    <section
      className={`fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-[#00000087] bg-opacity-50 transition-all duration-300 ${
        openDrawer && id ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className={`w-full sm:max-w-lg bg-white rounded-t-lg sm:rounded-lg shadow-lg transform transition-all duration-300 ${
          openDrawer && id ? 'translate-y-0' : 'translate-y-full sm:translate-y-0 sm:scale-95'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">Republish Auction</h2>
          <button
            onClick={() => setOpenDrawer(false)}
            className="text-2xl text-gray-500 hover:text-red-600 font-bold"
          >
            &times;
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-gray-600 text-sm mb-4">
            Let's update <span className="font-semibold text-gray-800">Start Time</span> and
            <span className="font-semibold text-gray-800"> End Time</span> to republish the auction.
          </p>

          {/* Date Time Pickers */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex flex-col sm:flex-row gap-4">
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                slotProps={{
                  textField: { fullWidth: true, variant: 'outlined' },
                }}
              />
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                slotProps={{
                  textField: { fullWidth: true, variant: 'outlined' },
                }}
              />
            </div>
          </LocalizationProvider>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOpenDrawer(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Republish auction', id, startTime, endTime);
                // Dispatch your redux action here
                setOpenDrawer(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm Republish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

