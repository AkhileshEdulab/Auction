
import React, { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuctionDetails } from '../Stores/Slices/auctionSlice';
import Spinner from '../Components/SubComponents/Spinner';
import { RiAuctionFill } from "react-icons/ri";
import { postBid } from '../Stores/Slices/bidSlice';

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, auctionDetails, auctionBidder } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
   
    const formData = new FormData();
    formData.append ('amount',amount);
     dispatch(postBid(id,formData));
     dispatch(getAuctionDetails(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/');
    }

    if (id) {
      dispatch(getAuctionDetails(id));
     
    }
  }, [ isAuthenticated]);

  if (!auctionDetails || !auctionDetails.startTime || !auctionDetails.endTime) {
    return (
      <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800">
        {loading ? <Spinner /> : <p className="text-red-500">Auction not found or failed to load.</p>}
      </section>
    );
  }

  const now = Date.now();
  const auctionStart = new Date(auctionDetails.startTime);
  const auctionEnd = new Date(auctionDetails.endTime);

  return (
    <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <FaGreaterThan />
        <Link to="/auctions" className="hover:text-red-500">Auction</Link>
        <FaGreaterThan />
        <span className="text-gray-500">{auctionDetails.title}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
<div className="flex p-4 flex-col gap-4 items-start">
  <div className="w-full aspect-video overflow-hidden rounded-lg">
    <img
      src={auctionDetails?.image?.url || "/placeholder.png"}
      alt={auctionDetails?.title || "Auction image"}
      className="w-full h-full object-contain"
    />
  </div>
  <h1 className="font-bold text-xl">{auctionDetails?.title}</h1>
</div>

          <hr className="my-4 border-gray-300" />
          <p className="text-lg font-medium mt-2">
            Category:{' '}
            <span className="text-red-500 text-md">
              {auctionDetails?.category}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            CurrentBid:{' '}
            <span className="text-red-500 text-md">
              {auctionDetails?.currentBid || auctionDetails?.startingBid}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            Condition:{' '}
            <span className="text-red-500 text-md">
              {auctionDetails?.condition}
            </span>
          </p>
          {/* <p className="text-lg font-medium mt-2">
            Minimum Bid:{' '}
            <span className="text-red-500 text-md">
              ₹{auctionDetails?.startingBid}
            </span>
          </p> */}

          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Auction Description</h2>
            <ul className="list-disc ml-6 text-base text-gray-600 space-y-2">
              {auctionDetails?.description?.split('. ').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 lg:h-1/2 bg-white shadow-md rounded-lg p-4 ">
          <div className="mb-4 bg-gray-300">
            <h2 className="font-semibold text-2xl p-2">Top Bidders</h2>
          </div>

          {/* Bidders List */}
          <div className="space-y-2">
            {auctionBidder && auctionBidder.length > 0 && now > auctionStart && now < auctionEnd ? (
              auctionBidder.map((bidder, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={bidder?.profileImage}
                      alt={bidder?.userName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-base font-medium">{bidder?.userName}</span>
                  </div>
                  <span className={`font-semibold text-[18px] ${
                    index === 0 ? 'text-green-500' :
                    index === 1 ? 'text-blue-500' :
                    index === 2 ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                  </span>
                </div>
              ))
            ) : now < auctionStart ? (
             <div className="flex w-full justify-center">
    <img
      src="/notStarted.png"
      alt="Auction Not Started"
      className="w-auto max-w-full h-auto max-h-[400px] object-contain"
    />
  </div>
) : (
  <div className="flex w-full justify-center">
    <img
      src="/auctionEnded.png"
      alt="Auction Ended"
      className="w-auto max-w-full h-auto max-h-[600px] object-contain"
    />
  </div>
            )}
          </div>

          {/* Bid Submission */}
          <div className="mt-6">
            {now >= auctionStart && now <= auctionEnd ? (
              <div className="flex sm:flex-row gap-3 items-center">
                <input
                  type="number"
                  placeholder="Enter your bid"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-lg focus:outline-red-500"
                />
                <button
                  onClick={handleBid}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  <RiAuctionFill />
                 Place Bid
                </button>
              </div>
            ) : now < auctionStart ? (
              <p className="text-yellow-600 font-semibold text-lg text-center">Auction has not started yet!</p>
            ) : (
              <p className="text-red-600 font-semibold text-lg text-center">Auction has ended!</p>
            )}
          </div>
        </div>


      </div>
    </section>
  );
};

export default AuctionItem;


