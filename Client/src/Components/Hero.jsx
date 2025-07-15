import React from 'react';
import HeroSlider from './SubComponents/HeroSlider';

const Hero = () => {
  return (
    <>
    <div className="">
       <div className="py-6 px-6 md:px-14 lg:px-14">
        <HeroSlider />
      </div>

    </div>
    </>
    // <section className="w-full px-4 py-6 bg-gray-50">
    //   <div className="flex flex-col lg:flex-row items-center justify-between gap-5 max-w-[1370px] mx-auto">

    //     {/* Left: Hero Slider */}
    //     <div className="w-full lg:w-2/3">
    //       <HeroSlider />
    //     </div>

    //     {/* Right: Image + YouTube Video */}
    //     {/* <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start gap-4">
    //       <div className="w-full">
    //         <img
    //           src="/360.jpg"
    //           alt="360 view"
    //           className="rounded-md w-full h-auto object-cover shadow-sm"
    //         />
    //       </div>
    //       <div className="w-full aspect-video rounded-md overflow-hidden shadow-sm">
    //         <iframe
    //           className="w-full h-full"
    //           src="https://www.youtube.com/embed/nInHvH6X7zM"
    //           title="YouTube video"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //       </div>

    //     </div> */}
    //   </div>
    // </section>
  );
};

export default Hero;
