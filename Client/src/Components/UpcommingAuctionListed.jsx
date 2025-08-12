
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Sidebar Filter Component
function SidebarFilters({ categories, typeOfSales }) {
  return (
    <aside className="w-64 p-4 space-y-6 border-r border-gray-200">
      <input
        type="search"
        placeholder="Search"
        className="w-full p-2 border rounded"
      />
      <div>
        <h3 className="font-bold mb-2 border-b border-gray-300 pb-1">Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="block mb-1 cursor-pointer">
            <input type="checkbox" className="mr-2" /> {cat}
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-bold mb-2 border-b border-gray-300 pb-1">Type Of Sales</h3>
        {typeOfSales.map((type) => (
          <label key={type} className="block mb-1 cursor-pointer">
            <input type="checkbox" className="mr-2" /> {type}
          </label>
        ))}
      </div>
    </aside>
  );
}
 function Countdown({ startTime, endTime }) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;
    let timeLeft = null;

    if (startDiff > 0) {
      timeLeft = {
        type: 'Starts In:',
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / 1000 / 60) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      timeLeft = {
        type: 'Ends In:',
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / 1000 / 60) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="bg-red-600 text-white rounded-full px-3 py-1 text-xs text-center font-semibold">
        Auction Ended
      </div>
    );
  }

  return (
    <div className="bg-white rounded-full px-4 py-1 text-xs flex space-x-3 justify-center items-center font-semibold shadow-md w-max mx-auto sm:mx-0">
     
      <div className="text-black text-center">
        <div>{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-gray-400 text-[9px]">Days</div>
      </div>
      <span className="text-gray-500">:</span>
      <div className="text-black text-center">
        <div>{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-gray-400 text-[9px]">Hours</div>
      </div>
      <span className="text-gray-500">:</span>
      <div className="text-black text-center">
        <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-gray-400 text-[9px]">Minutes</div>
      </div>
      <span className="text-gray-500">:</span>
      <div className="text-black text-center">
        <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-gray-400 text-[9px]">Seconds</div>
      </div>
    </div>
  );
}


// Auction Card Component
function AuctionCard({ auction }) {
  const imageUrl = auction.image?.url || 'https://via.placeholder.com/400x300?text=No+Image';
  const now = new Date();
  const start = new Date(auction.startTime);
  const end = new Date(auction.endTime);

  let auctionStatus = '';
  let badgeColor = '';

  if (now < start) {
    auctionStatus = 'Upcoming';
    badgeColor = 'bg-blue-600';
  } else if (now >= start && now <= end) {  
    auctionStatus = 'Live';
    badgeColor = 'bg-red-600';
  } else {
    auctionStatus = 'Ended';
    badgeColor = 'bg-gray-500';
  }

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-lg transition duration-200">
      <div className="relative">
        <img
          src={imageUrl}
          alt={auction.title}
          className="w-full h-48 object-cover rounded-t"
        />
       <span
  className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${
    auction.type === 'Live' ? 'bg-blue-600' : 'bg-red-600'
  }`}
>
  {auction.type === 'Live' ? 'Upcomming' : 'Live'}
</span>
        <div className="absolute bottom-3 left-3 right-3">
          {auction.endTime ? (
            <Countdown endTime={auction.endTime} />
          ) : (
            <div className="text-gray-400 text-xs text-center">End time not available</div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{auction.title}</h3>

        {auction.type === 'Live' ? (
          <>
            <div className="text-gray-600 text-xs">Current bid:</div>
            <div className="font-bold text-lg">
              ${auction.currentBid?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">
              Lot # {auction.lotNumber}
            </div>
          </>
        ) : (
          <>
            <div className="text-gray-600 text-xs">Starting bid:</div>
            <div className="font-bold text-lg">
              ${auction.startingBid?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">
              Sku # {auction.sku}
            </div>
          </>
        )}

        <div className="flex flex-col mt-3 text-xs text-gray-600">
          <span>Seller: {auction.seller}</span>
          <span>
            Starts at:{' '}
            <span className="text-gray-800 font-medium">
              {new Date(auction.startTime).toLocaleString()}
            </span>
          </span>
          <span>
            Ends at:{' '}
            <span className="text-gray-800 font-medium">
              {new Date(auction.endTime).toLocaleString()}
            </span>
          </span>
        </div>

       <button className="mt-4 w-full py-2 font-semibold rounded bg-black text-white hover:bg-gray-800 transition">
  {auctionStatus === 'Live' ? 'Bid Now' : 'Notify Me'}
</button>

      </div>
    </div>
  );
}

// Main Listing Page Component
export default function UpcommingAuctionListed() {
  const { allAuction } = useSelector((state) => state.auction);
  const today = new Date().toDateString();

  const auctionStartingToday =
    allAuction?.filter((item) => {
      const auctionDate = new Date(item.startTime).toDateString();
      return auctionDate === today;
    }) || [];

  const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Art',
  'Jewelry & Watches',
  'Books',
  'Sports & Outdoors',
  'Health & Beauty',
  'Toys & Games',
  'Music & Instruments',
  'Furniture',
  'Mobile Phones',
  'Computers & Tablets',
  'Gaming',
  'Motorcycles',
  'Bicycles',
  'Movies & TV Memorabilia'
];

  const typeOfSales = ['Upcoming', 'Latest', 'Highest Bidding', 'Live Auction', 'Popular'];

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">
      <SidebarFilters categories={categories} typeOfSales={typeOfSales} />
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {auctionStartingToday.length} Auctions Starting Today
          </p>
          <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none text-sm">
            <option>Default Sorting</option>
            <option>Highest Bidding</option>
            <option>Newest</option>
          </select>
        </div>

        {auctionStartingToday.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">No auctions starting today.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {auctionStartingToday.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
