import React, { useState } from 'react';
import { ImHammer2 } from "react-icons/im";
import { PiGavel } from "react-icons/pi";
import { PiWalletLight } from "react-icons/pi";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineHowToVote } from 'react-icons/md';
import { useSelector } from 'react-redux';

const steps = [
  {
    id: '01',
    title: 'Registration',
    icon: <FaRegUser className="text-4xl text-red-600" />,
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
    icon: <MdOutlineHowToVote className="text-4xl text-red-600" />,
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
    icon: <PiGavel className="text-4xl text-red-600" />,
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
    icon: <PiWalletLight  className="text-4xl text-red-600" />,
    description: 'Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.',
    points: [
      'Specific Information',
      'Required For Registration',
      'Such As Identification',
    ],
  },
];

const step2 = [
  {
    title: 'Our Mission',
    desc: 'Founded by Akhilesh, BidMarco was born out of a passion for connecting people with unique and valuable items. With years of experience in the auction industry, our team is committed to creating a platform that offers an unparalleled auction experience for users worldwide.',
  },
  {
    title: 'Our Values',
    desc: [
      "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
      "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
      "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
      "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    ],
  },
  {
    title: 'Our Story',
    desc: 'Founded by CodeWithZeeshu, PrimeBid was born out of a passion for connecting people with unique and valuable items. With years of experience in the auction industry, our team is committed to creating a platform that offers an unparalleled auction experience for users worldwide.',
  },
  {
    title: 'Join Us',
    desc: 'Whether you are looking to buy, sell, or simply explore, PrimeBid invites you to join our growing community of auction enthusiasts. Discover new opportunities, uncover hidden gems, and experience the thrill of winning your next great find.',
  },
];


const About = () => {
    const { user} = useSelector(state => state.user);
    const { leaderboard = [] } = useSelector((state) => state.user);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const totalBidders = leaderboard.length;
    const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
    };

  return (
   <section className="px-4 sm:px-8 md:px-16 lg:px-30 py-16 ">
    <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-16">
      About <span className="italic text-red-600">Us</span>
    </h2>

    {/* Section 1 */}
    <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
      <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Who We <span className="italic text-red-600">Are</span>
      </h2>
      <p className="text-gray-600 mb-8 text-base md:text-lg">
            Welcome to <strong className='text-red-600'>{user?.userName || "Our Platform"}</strong>,
            the ultimate destination for online auctions
            and bidding excitement. Founded in 2025, we are dedicated to
            providing a dynamic and user-friendly platform for buyers and
            sellers to connect, explore, and transact in a secure and seamless
            environment.
      </p>

      {/* Features */}
      <div className="space-y-6">
        {step2.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 text-lg">
            <div>
              <h4 className="font-bold  text-gray-900">{item.title}</h4>
              <p className="text-gray-600 ">{item.desc}</p>
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
            <h3 className="text-lg font-semibold">{formatNumber(totalBidders)}{" "} <span className="text-sm font-medium">Bidder</span></h3>
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
        Get In <span className="italic text-red-600">Know</span>
      </h2>

      <p className="text-gray-600 text-lg">
        Welcome to <strong className='text-red-600'>{user?.userName || "Our Platform"}</strong>, where digital innovation meets strategic excellence...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
        {[
          "Ready to boost your online presence",
          "Transform your business our Auction",
          "Click here to unlock your success!",
          "See result like never Click schedule",
          "Don't miss Join our exclusive insights",
        ].map((point, idx) => (
          <p key={idx} className="flex items-center gap-2 text-gray-600">
            <span>{point}</span>
          </p>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 pt-4">
        {[
          { icon: '', count: '3.5k', label: 'Customer', sub: 'Total Customer' },
          { icon: '', count: '700k', label: 'Auction', sub: 'Total Product' },
          { icon: '', count: '5.6k', label: 'Bidder', sub: 'Number Of Bidder' },
        ].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-xl">{stat.icon}</span>
            <div>
              <h4 className="font-bold text-lg">{stat.count} <span className="text-md font-normal">{stat.label}</span></h4>
              <p className="text-md text-gray-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
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

    <section className="bg-[#f8f4fc] py-20 px-4 sm:px-8 md:px-20 mt-20 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
        Select <span className="italic text-red-600">Our Product</span> At Our Auction.
      </h2>
      {/* Step Indicators */}
      <div className="relative flex justify-between items-center mb-16 max-w-6xl mx-auto px-4 overflow-hidden hover:overflow-visible">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative min-w-[70px] sm:min-w-[80px] z-10">
            <div
              className={`transition-all duration-300 px-4 py-1 rounded-full font-semibold text-xs sm:text-sm 
                ${hoveredIndex === index ? 'bg-red-600 text-white scale-105' : 'bg-gray-700 text-white'}
              `}
            >
              Step {step.id}
            </div>
            <div className="w-px h-4 bg-gray-500 mt-1 mb-1"></div>
            <div
              className={`h-4 w-4 rounded-full border-4 transition-all duration-300 
                ${hoveredIndex === index ? 'bg-red-500 border-red-600 scale-110' : 'bg-white border-gray-600'}
              `}
            ></div>
          </div>
        ))}
        <div className="absolute top-[20px] left-0 right-0 border-t border-dashed border-gray-400 z-0"></div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex gap-3 mb-4 items-center">
              {step.icon}
              <h3 className="text-xl font-bold">{step.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{step.description}</p>
            <ul className="text-sm text-gray-800 space-y-1">
              {step.points.map((point, i) => (
                <li key={i}>
                  <span className="font-semibold mr-1">{`0${i + 1}.`}</span>
                  {point}
                </li>
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
