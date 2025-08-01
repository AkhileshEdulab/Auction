import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const UpcommingAuction = () => {
  const { allAuction } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionStartToday = allAuction?.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  }) || [];

  const sliderRef = useRef();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 px-6 md:px-20 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Today's Starting Auctions
        </h2>
        <div className="space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {auctionStartToday.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          No auctions are starting today.
        </p>
      ) : (
        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {auctionStartToday.map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition w-[300px] flex-shrink-0"
            >
              {auction.image?.url ? (
                <img
                  src={auction.image.url}
                  alt={auction.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  No Image Available
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {auction.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Starts at:{' '}
                <span className="text-gray-700 font-medium">
                  {new Date(auction.startTime).toLocaleTimeString()}
                </span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Ends at:{' '}
                <span className="text-gray-700 font-medium">
                  {new Date(auction.endTime).toLocaleTimeString()}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Starting Price:{' '}
                <span className="text-green-700 font-semibold">
                  ₹{auction.startingBid}
                </span>
              </p>

              <button className="w-full py-2 bg-red-500 text-white rounded hover:bg-emerald-500 transition text-sm">
                View Auction
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcommingAuction;
