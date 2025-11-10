import React from 'react';
import { IoIosCreate } from "react-icons/io";

import {
  FaUser,
  FaGavel,
  FaFileInvoice,
  FaTrophy,
} from 'react-icons/fa';
const steps = [
  {
    step: '01',
    title: 'Registration',
    description:
      'Sabse pehle, platform par apne account ko register karein. Isme aapko apna naam, email or password and etc dena hoga. Registration ke baad aap login karke platform ke saare features access kar sakte hain.',
     icon: <FaUser />,
    },
  {
    step: '02',
    title: 'Role Selection',
    description:
      'Registration ke baad, aapko apni role select karni hogi. Aapko **Auctioneer** ka role select karna hoga. Auctioneer ke role se aap items ko auction mein add kar sakte hain.',
   icon: <FaGavel />,
    },
  {
    step: '03',
    title: 'Creating or Republish Auction',
    description:
      'Apne items ka auction create karne ke liye, aapko **title, description, price, or images and etc** upload karni hoti hain. Agar aapke item par auction already hai aur aapko republish karna hai, toh wo bhi kar sakte hain.',
   icon: <IoIosCreate  />,},
  {
    step: '04',
    title: 'Winning Bid Notification',
    description:
      'Jab auction ka time khatam ho jayega, **jo highest bidder hoga**, usi ko auction jeetne ki notification milegi. Aapko winner ko payment details bhejni hoti hain.',
  icon: <FaTrophy />, },
  {
    step: '05',
    title: 'Commission Payment (5% Fee)',
    description:
      'Agar auction jeeta gaya hai, toh auctioneer ko **5% commission** platform ka dena hoga, and aapko **payment ka screenshot** dena hoga. Admin payment verify karne ke baad hi aap apna next auction create ya republish kar sakte hain.',
   icon: <FaFileInvoice />,},
 
];


const HowToSell = () => {
  return (
    <section className=" py-20 px-4 md:px-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How <span className="italic text-red-400">Sell</span> Your Items
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Full vertical center line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

        {steps.map((step, index) => {
        const isLeft = index % 2 === 0;

  return (
    <div
      key={index}
      className={`mb-16 flex flex-col md:flex-row items-center relative group ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Content box */}
      <div
        className={`bg-white rounded-lg p-6 w-full md:w-[48%] z-10 transition  cursor-pointer ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div className="inline-block bg-gray-800 text-white text-md font-semibold px-3 py-1 rounded mb-2 group-hover:bg-red-500">
          Step {step.step}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </div>

      {/* Timeline Dot with icon */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-gray-400 items-center justify-center text-gray-800 text-xl transition-colors duration-300 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white z-20">
        {step.icon}
      </div>

      {/* Bridge segment that changes color on hover */}
      <div
        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10 w-1 ${
          index === steps.length - 1 ? 'h-0' : 'h-16'
        } bg-gray-300 transition-colors duration-300 group-hover:bg-red-500`}
        style={{ top: '100%' }}
      ></div>
    </div>
  );
})}
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 py-4 md:px-20 gap-5">
        {/* Card 1 */}
        <div className="relative w-full md:w-[900px] h-36 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            src="https://media.istockphoto.com/id/1088251226/photo/senior-couple-bidding-on-an-online-auction.jpg?s=2048x2048&w=is&k=20&c=W3EakVNBDzPZMKdOydA55FbxeyFc4ers5cPE8cdJGZw="
            alt="How to sell"
          />
          <p className="absolute top-2 left-4 text-white font-bold text-lg drop-shadow-md">
            How to sell your items?
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative w-full md:w-[900px] h-36 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            src="https://media.istockphoto.com/id/1088251226/photo/senior-couple-bidding-on-an-online-auction.jpg?s=2048x2048&w=is&k=20&c=W3EakVNBDzPZMKdOydA55FbxeyFc4ers5cPE8cdJGZw="
            alt="How to bid"
          />
          <p className="absolute top-2 left-4 text-white font-bold text-lg drop-shadow-md">
            How to bid?
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToSell;
