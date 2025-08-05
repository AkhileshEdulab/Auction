import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Card from './SubComponents/Card';

const UpcommingAuction = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const scrollContainerRef = useRef();

  const today = new Date();
  const todayString = today.toDateString();
  const auctionStartToday = allAuction.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 px-6 md:px-16 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Auctions For Today
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scroll('right')}
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
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth hide-scrollbar space-x-4"
        >
          {auctionStartToday.slice(0, 10).map((element) => (
            <div key={element._id} className="min-w-[250px] max-w-[300px] flex-shrink-0">
              <Card
                imgSrc={element.image?.url}
                title={element.title}
                statingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                id={element._id}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcommingAuction;
