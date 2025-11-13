import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Card from './SubComponents/Card';

import 'swiper/css';
import 'swiper/css/navigation';

const UpcommingAuction = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionStartToday = allAuction.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  // Refs for Swiper custom buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-10 px-6 md:px-28 ">
      {/* ✅ Top Section: Title + Navigation Buttons */}
      <div className="flex justify-between items-start mb-6">
        {/* Left: Title & Description */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">
            Auctions For Today
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Explore on the world's best & largest Bidding marketplace with our beautiful Bidding
          </p>
          <span className="text-gray-500 text-base">
            Products. We want to be a part of your smile, success and future growth.
          </span>
        </div>

        {/* Right: Navigation Buttons */}
         <div className="flex gap-2">
                    <button
                      ref={prevRef}
                      className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition cursor-pointer"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      ref={nextRef}
                      className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition cursor-pointer"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
      </div>

      {/* ✅ Slide Preview (Optional) */}
      <div className="text-md text-gray-500 mb-2">
        Showing {Math.min(slidesPerView, auctionStartToday.length)} of {auctionStartToday.length} auctions starting today
      </div>

      {/* ✅ Swiper Carousel */}
      {auctionStartToday.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No auctions are starting today.
        </p>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          onInit={(swiper) => {
            setSlidesPerView(swiper.params.slidesPerView);
            // Link Swiper navigation to custom buttons
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onResize={(swiper) => setSlidesPerView(swiper.params.slidesPerView)}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {auctionStartToday.slice(0, 10).map((element) => (
            <SwiperSlide key={element._id} className="w-full">
              <Card
                imgSrc={element.image?.url}
                title={element.title}
                statingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                id={element._id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default UpcommingAuction;
