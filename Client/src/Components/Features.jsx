import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from './SubComponents/Card';

const Features = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const scrollContainerRef = useRef();

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
    <section className="relative">
      <div className="my-8 px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Featured Auctions
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {allAuction.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No featured auctions available.</p>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth space-x-4 hide-scrollbar"
          >
            {allAuction.slice(0, 10).map((element) => (
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
      </div>
    </section>
  );
};

export default Features;
