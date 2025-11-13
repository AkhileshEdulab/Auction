

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './SubComponents/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';

const Features = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative">
      <div className="my-8 px-5 sm:px-6 lg:px-28">
        {/* Top Section: Title + Buttons */}
        <div className="flex justify-between items-start mb-4">
          {/* Left Side - Title & Description */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              Featured Auctions
            </h1>
            <p className="text-gray-500 text-base mt-2">
              Explore on the world's best & largest Bidding marketplace with our beautiful Bidding
            </p>
            <span className="text-gray-500 text-base">
              Products. We want to be a part of your smile, success and future growth.
            </span>
          </div>

          {/* Right Side - Navigation Buttons */}
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

        {/* Slide Preview */}
        <div className="text-md text-gray-500 mb-2">
          Showing {Math.min(slidesPerView, allAuction.length)} of {allAuction.length} featured auctions
        </div>

        {/* Swiper */}
        {allAuction.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No featured auctions available.
          </p>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            onInit={(swiper) => {
              setSlidesPerView(swiper.params.slidesPerView);
              // Bind custom navigation refs
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onResize={(swiper) => {
              setSlidesPerView(swiper.params.slidesPerView);
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-10"
          >
            {allAuction.slice(0, 10).map((element) => (
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
      </div>
    </section>
  );
};

export default Features;
