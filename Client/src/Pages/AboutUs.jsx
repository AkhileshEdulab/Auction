import React from 'react';
import { ImHammer2 } from "react-icons/im";

import { FaUserCheck, FaGavel, FaWallet } from 'react-icons/fa';
import { MdOutlineHowToVote } from 'react-icons/md';
import { useSelector } from 'react-redux';
 

const steps = [
  {
    id: '01',
    title: 'Registration',
    icon: <FaUserCheck className="text-4xl text-emerald-500" />,
    description: 'Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.',
    points: [
      'Specific Information',
      'Required For Registration',
      'Such As Identification',
    ],
  },
  {
    id: '02',
    title: 'Select Product',
    icon: <MdOutlineHowToVote className="text-4xl text-emerald-500" />,
    description: 'Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.',
    points: [
      'Search Your Auction',
      'Find The Right Product',
      'Find The Right Product',
    ],
  },
  {
    id: '03',
    title: 'Go to Bidding',
    icon: <FaGavel className="text-4xl text-emerald-500" />,
    description: 'Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.',
    points: [
      'Choose The Bid Product',
      'Bid according your ability',
      'Keep your eyes on the bid',
    ],
  },
  {
    id: '04',
    title: 'Make Payment',
    icon: <FaWallet className="text-4xl text-emerald-500" />,
    description: 'Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.',
    points: [
      'Specific Information',
      'Required For Registration',
      'Such As Identification',
    ],
  },
];
const About = () => {
     const { user, loading } = useSelector(state => state.user);
  return (
   <section className="px-4 sm:px-8 md:px-16 lg:px-36 py-16 bg-white">
  <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-16">
    About <span className="italic text-gray-400">Us</span>
  </h2>

  {/* Section 1 */}
  <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Who We <span className="italic text-gray-400">Are</span>
      </h2>
      <p className="text-gray-600 mb-8 text-base md:text-lg">
        Welcome to <strong>{user?.userName || "Our Platform"}</strong>, where digital innovation meets strategic excellence...
      </p>

      {/* Features */}
      <div className="space-y-6">
        {[
          { emoji: '📄', title: 'Our Expert Solutions' },
          { emoji: '🧬', title: 'Trusted Performance' },
          { emoji: '🌍', title: 'Experience the Difference' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-full text-2xl">{item.emoji}</div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900">{item.title}</h4>
              <p className="text-gray-600">Praesent gravida nunc at tortor cursus...</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Image with badge */}
    <div className="flex-1 w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
      <div className="relative w-full max-w-lg">
        <img
          src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home5-about-img.webp"
          alt="Main"
          className="rounded-2xl w-full h-auto object-cover"
        />
        <div className="absolute top-6 right-4 bg-white p-4 rounded-xl shadow-md flex items-center gap-3 w-48 sm:w-52">
          <ImHammer2 className="text-2xl" />
          <div>
            <h3 className="text-lg font-semibold">5.6k <span className="text-sm font-medium">Bidder</span></h3>
            <p className="text-xs text-gray-500">Number Of Total Bidder</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Section 2 */}
  <div className="flex flex-col lg:flex-row gap-12 mt-20">
    <div className="flex-1">
      <img
        src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img1.webp"
        alt="Lawyer"
        className="rounded-xl w-full h-auto object-cover shadow-md"
      />
    </div>

    <div className="flex-1 space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold">
        Get In <span className="italic text-gray-400">Know</span>
      </h2>

      <p className="text-gray-600">
        Welcome to <strong>{user?.userName || "Our Platform"}</strong>, where digital innovation meets strategic excellence...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {[
          "Ready to boost your online presence",
          "Transform your business our Auction",
          "Click here to unlock your success!",
          "See result like never Click schedule",
          "Don't miss Join our exclusive insights",
        ].map((point, idx) => (
          <p key={idx} className="flex items-center gap-2 text-gray-600">
            ✅ <span>{point}</span>
          </p>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 pt-4">
        {[
          { icon: '⭐', count: '3.5k', label: 'Customer', sub: 'Total Customer' },
          { icon: '📦', count: '700k', label: 'Auction', sub: 'Total Product' },
          { icon: '🔨', count: '5.6k', label: 'Bidder', sub: 'Number Of Bidder' },
        ].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-xl">{stat.icon}</span>
            <div>
              <h4 className="font-bold text-lg">{stat.count} <span className="text-sm font-normal">{stat.label}</span></h4>
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
        About us More →
      </button>
    </div>
  </div>

  {/* Testimonials */}
  <div className="mt-20 flex flex-col lg:flex-row items-start gap-10">
    <div className="lg:w-1/2 bg-green-50 p-6 rounded-lg">
      <p className="italic text-gray-700">
        "I work with Alguneeb Johnl on many projects..."
      </p>
      <p className="font-bold mt-4">Leslie Alexander</p>
    </div>
    <div className="lg:w-1/2">
      <img
        src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img2.webp"
        alt="Gallery"
        className="rounded-lg shadow-md w-full h-auto object-cover"
      />
    </div>
  </div>

  {/* Steps Section */}
  <section className="bg-[#f8f4fc] py-20 px-4 sm:px-8 md:px-20 mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
      Select <span className="italic text-gray-400">Our Product</span> At Our Auction.
    </h2>

    <div className="relative flex justify-between items-center mb-16 max-w-6xl mx-auto px-4 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative min-w-[70px] sm:min-w-[80px]">
          <div className="bg-gray-700 text-white text-xs sm:text-sm font-semibold px-4 py-1 rounded-full z-10">
            Step {step.id}
          </div>
          <div className="w-px h-4 bg-gray-500 mt-1 mb-1"></div>
          <div className="h-4 w-4 bg-white border-4 border-gray-600 rounded-full z-10"></div>
        </div>
      ))}
      <div className="absolute top-[20px] left-0 right-0 border-t border-dashed border-gray-400 z-0"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex gap-3 mb-4 items-center">
            {step.icon}
            <h3 className="text-xl font-bold">{step.title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">{step.description}</p>
          <ul className="text-sm text-gray-800 space-y-1">
            {step.points.map((point, i) => (
              <li key={i}><span className="font-semibold mr-1">{`0${i + 1}.`}</span>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
</section>

  );
};

export default About;
