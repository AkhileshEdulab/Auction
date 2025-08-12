import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const NotFound = () => {
  return (
    <>
      <div className="py-12 px-4 lg:px-32 flex flex-col md:flex-row items-center justify-center gap-12  min-h-screen text-center md:text-left">
        
        {/* LEFT SECTION */}
        <div className="md:w-1/2 space-y-6">
          <div>
            <h1 className="font-bold text-6xl sm:text-7xl md:text-9xl text-red-600">404</h1>
            <h4 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-gray-800">Page Not Found!</h4>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Uh oh, we can't seem to find the page you're looking for.
            Try going back or check our <span className="text-blue-600 underline cursor-pointer">Help Center</span> for more info.
          </p>

          {/* Go Back Button */}
          <div className="pt-4">
            <Link to="/">
              <button className="h-12 w-60 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300">
                <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  Go Back to Home Page <FaArrowRight />
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-[500px] border-b-8 text-red-600 rounded-b-full p-6 sm:p-8 relative">

          {/* 404 Symbol */}
          <div className="text-5xl sm:text-6xl md:text-8xl font-bold flex items-center justify-center gap-4">
            {/* Circle 1 */}
            <div className="border-4 border-black rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-6xl font-bold">×</span>
            </div>

            {/* Circle 2 */}
            <div className="border-4 border-black rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-6xl font-bold">×</span>
            </div>

            {/* Text */}
            <span className="text-3xl sm:text-4xl md:text-6xl font-bold">PS!</span>
          </div>
{/* Message Badge (Only on sm and up) */}
          <div className="hidden sm:flex justify-end mt-2 text-sm">
            <span className="px-4 py-1 bg-red-600 text-white rounded-full">
              404 – Sorry, the page not found
            </span>
          </div>
          {/* Decorative line and dot */}
          <div className="relative m-12 flex justify-center">
            <div className="w-24 h-4 border-t-8 rounded-t-full "></div>
            <div className="absolute mt-2  w-5 h-6 border-2 border-black bg-white rounded-b-2xl flex items-start justify-center">
              <div className="w-1 h-3 bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
