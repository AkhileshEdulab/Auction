import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Slider from 'react-slick';
import Card from './SubComponents/Card';

const UpcommingAuction = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const sliderRef = useRef();

  const today = new Date();
  const todayString = today.toDateString();

  const auctionStartToday = allAuction.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: auctionStartToday.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="py-10 px-6 md:px-20 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Today's Starting Auctions
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
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
        <Slider ref={sliderRef} {...sliderSettings}>
          {auctionStartToday.slice(0, 6).map((element) => (
            <div key={element._id} className="px-2">
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
        </Slider>
      )}
    </section>
  );
};

export default UpcommingAuction;
