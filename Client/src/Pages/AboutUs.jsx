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
    <section className="px-16 md:px-36 py-16 bg-white">
            <h2 className="text-4xl text-center  font-bold text-gray-900 mb-16">
            About <span className="italic text-gray-400">Us</span>
          </h2> 
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 ">
          {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who We <span className="italic text-gray-400">Are</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Welcome to <strong>{user?.userName || "Our Platform"}</strong>, where digital innovation meets strategic excellence. As a dynamic force in the realm of digital marketing, we are dedicated to propelling businesses into the spotlight of online success with us for this example.
          </p>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full text-2xl">📄</div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900">Our Expert Solutions</h4>
                <p className="text-gray-600 ">
                  Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full text-2xl">🧬</div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900">Trusted Performance</h4>
                <p className="text-gray-600 ">
                  Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full text-2xl">🌍</div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900">Experience the Difference</h4>
                <p className="text-gray-600 ">
                  Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end">
          <div className="relative w-[550px]">
            {/* Main Image */}
            <img
              src={'https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home5-about-img.webp'}
              alt="Main"
              className="rounded-2xl  w-full"
            />

            {/* Stats Box */}
            <div className="absolute top-20 right-2 bg-white p-4 rounded-xl shadow-md flex items-center gap-3 w-52">
              <div className="text-2xl"><ImHammer2/></div>
              <div>
                <h3 className="text-lg font-semibold">5.6k <span className="text-sm font-medium">Bidder</span></h3>
                <p className="text-xs text-gray-500">Number Of Total Bidder</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>

       <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left image */}
        <div className="flex-1">
          <img src={'https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img1.webp'} alt="Lawyer" className="rounded-xl w-full shadow-md" />
        </div>

        {/* Right content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold">
            Get In <span className="italic text-gray-400">Know</span>
          </h2>

          <p className="text-gray-600">
            Welcome to <strong>{user?.userName || "Our Platform"}</strong>, where digital innovation meets strategic excellence. As a dynamic force in the realm of digital marketing, we are dedicated to propelling businesses into the spotlight of online success with us for this example.
          </p>

          {/* Bullet points */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p className="flex items-center gap-2 text-gray-600">
              ✅ <span>Ready to boost your online presence</span>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              ✅ <span>Transform your business our Auction</span>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              ✅ <span>Click here to unlock your success!</span>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              ✅ <span>See result like never Click schedule</span>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              ✅ <span>Don't miss Join our exclusive insights</span>
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <div>
                <h4 className="font-bold text-lg">3.5k <span className="text-sm font-normal">Customer</span></h4>
                <p className="text-xs text-gray-500">Total Customer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <div>
                <h4 className="font-bold text-lg">700k <span className="text-sm font-normal">Auction</span></h4>
                <p className="text-xs text-gray-500">Total Product</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">🔨</span>
              <div>
                <h4 className="font-bold text-lg">5.6k <span className="text-sm font-normal">Bidder</span></h4>
                <p className="text-xs text-gray-500">Number Of Bidder</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition">
            About us More →
          </button>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-20 flex flex-col lg:flex-row items-start gap-10">
        <div className="lg:w-1/2">
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="italic text-gray-700">
              "I work with Alguneeb Johnl on many projects, he always told agonaex my expectations with his quality work and fastestopa tope services smooth and simple communication."
            </p>
            <p className="font-bold mt-4">Leslie Alexander</p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src={'https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img2.webp'} alt="Gallery" className="rounded-lg shadow-md w-full" />
        </div>
      </div>


      <section className="bg-[#f8f4fc] py-20 px-6 md:px-20">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Select <span className="italic text-gray-400">Our Product</span> At Our Auction.
        </h2>
      </div>

      <div className="relative flex justify-between items-center mb-16 max-w-6xl mx-auto px-4">
  {steps.map((step, index) => (
    <div key={index} className="flex flex-col items-center relative">
      {/* Step Label */}
      <div className="bg-gray-700 text-white text-sm font-semibold px-5 py-1 rounded-full z-10">
        Step {step.id}
      </div>

      {/* Down Arrow */}
      <div className="w-px h-4 bg-gray-500 mt-1 mb-1"></div>

      {/* Circle Indicator */}
      <div className="h-4 w-4 bg-white border-4 border-gray-600 rounded-full z-10"></div>
    </div>
  ))}

  {/* Dashed Connecting Line */}
  <div className="absolute top-[20px] left-0 right-0 border-t border-dashed border-gray-400 z-0"></div>
</div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <div className="flex gap-3 mb-4">{step.icon}
            <h3 className="text-xl font-bold mb-2">{step.title}</h3></div>
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
