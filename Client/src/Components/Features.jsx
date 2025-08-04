
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import Card from './SubComponents/Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Features = () => {
  const { allAuction = [] } = useSelector((state) => state.auction);
  const [showTop, setShowTop] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: allAuction.length > 4,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
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
              onClick={() => sliderRef.current.slickPrev()}
              className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="p-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

       {allAuction.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No featured auctions available.</p>
         ) : (
        <Slider ref={sliderRef} {...sliderSettings} >
          {allAuction.slice(0, 6).map((element) => (
            <div key={element._id} className="px-2 ">
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

      </div>

      {/* Scroll To Top Button */}
      {showTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          ↑ Top
        </button>
      )}
    </section>
  );
};

export default Features;
