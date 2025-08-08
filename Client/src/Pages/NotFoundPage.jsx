
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
   <>
   <div className="py-16 flex flex-col items-center justify-center bg-white px-4 text-center">
       
      <div className=" border-b-8 text-red-600 rounded-b-full p-28">
        <div className="text-6xl md:text-9xl font-bold flex items-center justify-center">
        
        <div className="relative inline-block mx-2">
          <span className=" border-4 border-black rounded-full w-24 h-24 flex items-center justify-center">
            <span className="text-6xl font-bold">×</span>
          </span>
        </div>
        <div className="relative inline-block mx-2">
          <span className=" border-4 border-black rounded-full w-24 h-24 flex items-center justify-center">
            <span className="text-6xl font-bold">×</span>
          </span>
        </div>
        <span className="">PS!</span>
      </div>
<div className="relative right-24">
 
  <div className="w-24 h-1 bg-black mx-auto"></div>
  <div className="absolute right-[165px] w-5 h-6 border-2 border-black bg-white mx-auto rounded-b-2xl">
    <div className="w-1 h-3 bg-black mx-auto "></div>
  </div>
</div>

      <div className=" absolute right-[31%]  flex flex-col sm:flex-row items-center gap-4">
        <span className="px-4 py-0.5 bg-red-600 text-white rounded-full ">
          404 – Sorry, the page not found
        </span>
       
      </div>
      <Link to="/">
  <button className=" h-24 w-96  mt-28 rounded-[100%] bg-red-500 text-white font-semibold hover:bg-red-600 transition">
    <span className="inline-block transition-transform duration-500 hover:scale-110 cursor-pointer">
      Go Back to Home Page
    </span>
  </button>
</Link>

      </div>
    </div>
     
   </>
  );
};

export default NotFound;
