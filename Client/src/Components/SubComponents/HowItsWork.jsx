import React from 'react';
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from 'react-icons/fa';

const steps = [
  {
    step: '01',
    title: 'User Registration',
    description:
      'Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.',
    icon: <FaUser />,
  },
  {
    step: '02',
    title: 'Role Selection',
    description:
      'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    icon: <FaGavel />,
  },
  {
    step: '03',
    title: 'Winning Bid Notification',
    description:
      "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    icon: <FaEnvelope />,
  },
  {
    step: '04',
    title: 'Commission Payment',
    description:
      'If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.',
    icon: <FaDollarSign />,
  },
  {
    step: '05',
    title: 'Proof of Payment',
    description:
      'The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.',
    icon: <FaFileInvoice />,
  },
  {
    step: '06',
    title: 'Reposting Items',
    description:
      'If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.',
    icon: <FaRedo />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How <span className="italic text-red-400">Online Auction</span> Works
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

export default HowItWorks;
