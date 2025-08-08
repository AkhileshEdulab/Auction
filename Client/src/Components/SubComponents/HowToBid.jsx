import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaTrophy, FaCreditCard, FaGavel } from 'react-icons/fa'; // Icons

const steps = [
  {
    step: '01',
    title: 'Registration',
    description:
      'Sabse pehle, aapko platform par apne aapko register karna hoga. Iske liye apne personal details jaise ki naam, email, aur password provide karna padega. Registration ke baad aap login karke platform ki saari features access kar sakte hain, jaise ki listings dekhna aur bidding karna.',
    icon: <FaUser /> // Icon for Registration
  },
  {
    step: '02',
    title: 'Browse Listings',
    description:
      'Apne account se login karne ke baad, aapko items dekhne ke liye listings browse karni hogi. Yahan par aapko wo saare items milenge jo auction ke liye available hain. Aap categories ke according ya keywords se apni searches narrow kar sakte hain.',
    icon: <FaSearch /> // Icon for Browse Listings
  },
  {
    step: '03',
    title: 'Place Bids',
    description:
      'Jab aapko koi item pasand aaye, toh aap us item par bid kar sakte hain. Har item ki ek starting bid hoti hai. Aapko apna bid place karte waqt dhyan rakhna hoga ki aap jo bid place kar rahe hain, wo minimum starting bid se zyada ho. Jab aap apni bid place karenge, aapko ek confirmation milega, aur aap dekh sakte hain ki aapki bid current highest bid hai ya nahi.',
    icon: <FaGavel /> // Icon for Place Bids
  },
  {
    step: '04',
    title: 'Winning the Auction',
    description:
      'Jab auction ka time khatam ho jayega, jo highest bid hoga, usi ko auction jeetne ka hak milega. Agar aapki bid sabse zyada thi, toh aapko item jeetne ki notification milegi. Iske baad, aapko payment karna hoga, aur once payment complete ho jayegi, seller aapko item ship kar dega.',
    icon: <FaTrophy /> // Icon for Winning the Auction
  },
  {
    step: '05',
    title: 'Payment and Shipping',
    description:
      'Payment Instructions: Jab aap jeet jate hain, auctioneer aapko payment instructions bheje ga. Isme item ka total price, shipping charges, aur payment method (Bank Transfer, PayPal, Easypaisa, etc.) di jayengi. Aapko payment ka deadline bhi diya jayega.',
    icon: <FaCreditCard /> // Icon for Payment and Shipping
  },
];

const HowToBid = () => {
  return (
    <>
      <section className=" py-20 px-4 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How To Online <span className="italic text-red-400">Bid</span>
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
                  className={`bg-white rounded-lg p-6 w-full md:w-[48%] z-10 transition cursor-pointer ${
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
      </section>
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
    </>
  );
};

export default HowToBid;
