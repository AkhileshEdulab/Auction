import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: '01',
    title: 'Registration',
    description:
      'Clearly state your pricing structure, payment terms and any additional charges. Specifying when & payment invoices will be issued, as well as your accepted.',
  },
  {
    step: '02',
    title: 'Browse Listings',
    description:
      'Clearly state your pricing structure, payment terms and any additional charges. Specifying when & payment invoices will be issued, as well as your accepted.',
  },
  {
    step: '03',
    title: 'Place Bids',
    description:
      'Clearly state your pricing structure, payment terms and any additional charges. Specifying when & payment invoices will be issued, as well as your accepted.',
  },
  {
    step: '04',
    title: 'Winning the Auction',
    description:
      'Clearly state your pricing structure, payment terms and any additional charges. Specifying when & payment invoices will be issued, as well as your accepted.',
  },
  {
    step: '05',
    title: 'Payment and Shipping',
    description:
      'Clearly state your pricing structure, payment terms and any additional charges. Specifying when & payment invoices will be issued, as well as your accepted.',
  },
];

const HowToSell = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-16">
      <div className="text-center mb-16 ">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How To <span className="italic text-gray-400">Bid</span>
        </h2>
        {/* <p className="text-sm text-green-500 mt-2">Home → How to Bid</p> */}
        <Link to={'/'} > <span className='hover:text-red-500 text-lg'>Home →</span> How to Sell</Link>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Center Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={` mb-16 flex flex-col md:flex-row items-center ${
                isLeft ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              {/* Content Box */}
              <div
                className={`bg-white group  rounded-lg p-6 w-full md:w-[48%] z-10  transition ${
                  isLeft ? 'md:mr-auto' : 'md:ml-auto'
                }`}
              >
                <div className="inline-block bg-gray-800 group-hover:bg-red-500 text-white text-md font-semibold px-3 py-1 rounded mb-2 transition-all">
                  Step–{step.step}
                </div>
                <h3 className="text-[34px] font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-xl  text-gray-600">{step.description}</p>
                  {/* Center Dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-3 border-gray-400 group-hover:border-red-500 z-20 transition-all"></div>
            </div>
              </div>

            
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center pt-16">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">
          Guidelines For Selling
        </h3>
      </div>
    </section>
  );
};

export default HowToSell;
