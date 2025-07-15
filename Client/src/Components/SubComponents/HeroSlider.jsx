import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpeg",
  "4.jpg"
]

const HeroSlider = () => {


const [slider,setSlider] = useState(0);

const nextSlider = ()=>{
  setSlider((prevSlide)=>(prevSlide + 1)%images.length)
}
const prevSlider = ()=>{
  setSlider((prevSlide)=>(prevSlide - 1 + images.length)%images.length)
}

useEffect(()=>{
  const notinterval = setInterval(nextSlider,5000);
  return () =>clearInterval(notinterval)
})
  return (
   <div className=" ">
    <div className="flex flex-col md:flex-row gap-8">
      
        <div className="relative w-full overflow-hidden group mx-auto rounded-lg ">
          <button onClick={prevSlider} className='absolute top-1/2 left-4 transform translate-y-1/2 text-white text-3xl cursor-pointer bg-red-500 bg-opacity-50 opacity-0 group-hover:opacity-100 p-2 rounded-full transition-opacity duration-300'>
            <FaArrowLeft/></button>

          <div className="crousel-image">
            <img src={images[slider]} 
            alt={`Slider${slider + 1}`} 
            className='w-full h-[300px] md:h-[500px] object-cover transition-all ease-in-out duration-700 '
            />
          </div> 
          <button onClick={nextSlider} className='absolute top-1/2 right-4 transform translate-y-1/2 text-white text-3xl p-2 cursor-pointer bg-red-500 rounded-full bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'><FaArrowRight/></button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_,item)=>(
              <button key={item} 
              onClick={()=>setSlider(item)}
              className={`w-3 h-3 rounded-full ${slider === item ? "bg-red-500":"bg-gray-400"} cursor-pointer transition-colors duration-300 `}             />
            ))}
          </div>
        </div>
      

          <div className="flex flex-col  gap-5 md:gap-5">
  <div className="relative group w-full md:w-[300px]">
    <div className="relative h-[240px] overflow-hidden rounded-lg">
      <img
        src="1.jpg"
        alt="Samsung Gear VR Camera"
        className="w-full h-full object-cover group-hover:scale-105 transform-gpu transition-transform duration-700"
      />

      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10">
        <div className="bg-white  opacity-80 text-black flex px-4 py-1  gap-2 rounded-full ">
          <div className="flex flex-col items-center">
            <h1 className="font-bold ">175</h1>
            <p className="text-sm">Days</p>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <h1 className="font-bold ">6</h1>
            <p className="text-sm">Hours</p>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <h1 className="font-bold ">8</h1>
            <p className="text-sm">Minutes</p>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <h1 className="font-bold ">45</h1>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="relative group w-full md:w-[300px]">
    <div className="relative w-full md:w-[300px] h-[240px] overflow-hidden rounded-lg">
     <iframe
             className="w-full h-full"
             src="https://www.youtube.com/embed/nInHvH6X7zM"
             title="YouTube video"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           ></iframe>
    </div>
  </div>
        </div>

    </div>
   </div>
  )
}

export default HeroSlider;