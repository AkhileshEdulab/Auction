import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import { LuMoveUpRight } from "react-icons/lu";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  return (
    <div className="relative mt-6 flex flex-col md:flex-row items-center justify-between px-6 lg:px-28 py-4 overflow-hidden ">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 z-20">
        <p className="text-red-600 font-semibold text-base sm:text-2xl">Welcome To <span className='text-2xl font-bold font-serif italic bg-gradient-to-br from-yellow-600 to-slate-900 bg-clip-text text-transparent'> BidMarko</span> Auction</p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Select, <span className="text-red-600">Our Product </span> At Our Auction.
        </h1>
       
          <p className="text-gray-600 text-md md:text-base max-w-md mx-auto md:mx-0">
            Discover rare finds and exclusive collectibles in real time. Bid, win, and own the items you love with ease and transparency. Join our global community of buyers and sellers and experience the thrill of live auctions like never before.
          </p>

        
        <Link to={'/upcoming'} className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all mx-auto md:mx-0 w-fit">
          Start Exploring <span className="text-lg transition-all duration-200 hover:scale-150 inline-block"> <LuMoveUpRight /></span>
        </Link>
      </div>

      {/* Right Content */}
      <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center z-20">

        {/* Background Circle */}
        <div className="absolute  w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-[#e2efeb] rounded-full z-0"></div>

        {/* Swiper Image Slider */}
        <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[500px] relative z-10">
          <Swiper
            effect="fade"
            modules={[EffectFade, Pagination, Autoplay]}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet custom-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active custom-active-bullet',
            }}
            autoplay={{ delay: 5000 }}
            loop={false}
            fadeEffect={{ crossFade: true }}
            className="rounded-lg"
          >
            <SwiperSlide>
              <img src="banner.png" alt="bike-1" className="w-full object-contain" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://static.vecteezy.com/system/resources/previews/057/024/685/non_2x/high-quality-gavel-with-elegant-design-for-legal-professionals-free-png.png" alt="hammer" className="w-full object-contain" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="banner1.png" alt="bike-2" className="w-full object-contain" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="banner2.webp" alt="bike-3" className="w-full object-contain" />
            </SwiperSlide>
          </Swiper>

          {/* Swiper Dot Styles */}
          <style >{`
            .custom-bullet {
              background-color: #d1d5db;
              width: 12px;
              height: 12px;
              opacity: 1;
              margin: 0 4px;
              border-radius: 9999px;
            }
            .custom-active-bullet {
              background-color: #ef4444;
            }
          `}</style>
        </div>

        {/* Yellow Oval Shadow */}
      </div>
    </div>
  );
};

export default HeroSlider;
