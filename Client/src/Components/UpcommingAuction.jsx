import React from 'react';
import { useSelector } from 'react-redux';

const UpcommingAuction = () => {
  const { allAuction } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionStartToday = allAuction?.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  }) || [];
  
  return (
    <section className="py-10 px-6 md:px-20 bg-white ">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 ">
        Today's Starting Auctions
      </h2>

      {auctionStartToday.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">No auctions are starting today.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionStartToday.map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition"
            >
              {/* Auction Image */}
              {auction.image?.url ? (
                <img
                  src={auction.image.url}
                  alt={auction.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  No Image Available
                </div>
              )}

              {/* Title & Info */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {auction.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Starts at:{' '}
                <span className="text-gray-700 font-medium">
                  {new Date(auction.startTime).toLocaleTimeString()}
                </span>
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Ends at:{' '}
                <span className="text-gray-700 font-medium">
                  {new Date(auction.endTime).toLocaleTimeString()}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Starting Price:{' '}
                <span className="text-green-700 font-semibold">
                  ₹{auction.startingBid}
                </span>
              </p>

              <button className="w-full py-2 bg-red-500 text-white rounded hover:bg-emerald-500 transition">
                View Auction
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcommingAuction;


// import React, { useEffect, useState } from 'react';

// const categories = [
//   'Antiques', 'Automotive', 'Books & comics', 'Digital art', 'Fashion',
//   'Gadget', 'Jewelry', 'Old Coin', 'Real Estate'
// ];

// const typeOfSales = [
//   'Upcoming', 'Latest', 'Highest Bidding', 'Live Auction', 'Popular'
// ];

// const auctionDataSample = [
//   {
//     _id: '1',
//     image: { url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
//     title: 'Canvas & culture brush withn elegance auction.',
//     currentBid: 10180,
//     lotNumber: '576894',
//     type: 'Live',
//     endTime: new Date(Date.now() + 20431 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
//     seller: 'Egens lab',
//   },
//   {
//     _id: '2',
//     image: { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
//     title: 'Rare Find Signed Copy of The KingFlok table.',
//     startingBid: 2898,
//     sku: 'Kinflok-26',
//     type: 'Upcoming',
//     endTime: new Date(Date.now() + 20431 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
//     seller: 'Egens lab',
//   },
//   {
//     _id: '3',
//     image: { url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66' },
//     title: "Vintag Classic Leather bound God’s leading lady.",
//     startingBid: 8974,
//     sku: 'T.D_J-300',
//     type: 'Upcoming',
//     endTime: new Date(Date.now() + 20421 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
//     seller: 'Egens lab',
//   },
//   // add more items...
// ];

// function Countdown({ endTime }) {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     function updateTimer() {
//       const now = new Date().getTime();
//       const distance = new Date(endTime).getTime() - now;

//       if (distance > 0) {
//         setTimeLeft({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((distance % (1000 * 60)) / 1000),
//         });
//       } else {
//         setTimeLeft(null);
//       }
//     }

//     updateTimer();
//     const timerId = setInterval(updateTimer, 1000);
//     return () => clearInterval(timerId);
//   }, [endTime]);

//   if (!timeLeft) return <span>Auction Ended</span>;

//   return (
//     <div className="bg-white rounded-full px-4 py-1 text-xs sm:text-sm flex space-x-3 justify-center items-center font-semibold shadow-md w-max mx-auto sm:mx-0">
//       <div className="text-black text-center">
//         <div>{timeLeft.days}</div>
//         <div className="text-gray-400 text-[9px]">Days</div>
//       </div>
//       <span className="text-gray-500">.</span>
//       <div className="text-black text-center">
//         <div>{timeLeft.hours.toString().padStart(2, '0')}</div>
//         <div className="text-gray-400 text-[9px]">Hours</div>
//       </div>
//       <span className="text-gray-500">.</span>
//       <div className="text-black text-center">
//         <div>{timeLeft.minutes.toString().padStart(2, '0')}</div>
//         <div className="text-gray-400 text-[9px]">Minutes</div>
//       </div>
//       <span className="text-gray-500">.</span>
//       <div className="text-black text-center">
//         <div>{timeLeft.seconds.toString().padStart(2, '0')}</div>
//         <div className="text-gray-400 text-[9px]">Second</div>
//       </div>
//     </div>
//   );
// }

// const AuctionCard = ({ auction }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-lg transition duration-200">
//       <div className="relative">
//         <img
//           src={auction.image.url}
//           alt={auction.title}
//           className="w-full h-48 object-cover rounded-t"
//         />

//         {/* Badge */}
//         <span
//           className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${
//             auction.type === 'Live' ? 'bg-red-600' : 'bg-blue-600'
//           }`}
//         >
//           {auction.type === 'Live' ? 'Live' : 'Upcoming'}
//         </span>

//         {/* Countdown timer overlay */}
//         <div className="absolute bottom-3 left-3 right-3">
//           <Countdown endTime={auction.endTime} />
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{auction.title}</h3>

//         {auction.type === 'Live' ? (
//           <>
//             <div className="text-gray-600 text-xs">Current bid:</div>
//             <div className="font-bold text-lg">${auction.currentBid?.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
//             <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">Lot # {auction.lotNumber}</div>
//           </>
//         ) : (
//           <>
//             <div className="text-gray-600 text-xs">Starting bid:</div>
//             <div className="font-bold text-lg">${auction.startingBid?.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
//             <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">Sku # {auction.sku}</div>
//           </>
//         )}

//         <div className="flex items-center mt-3 space-x-2 text-gray-500 text-xs">
//           <svg
//             className="w-4 h-4 text-gray-400"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
//             />
//           </svg>
//           <span>{auction.seller}</span>
//         </div>

//         <button
//           className={`mt-4 w-full py-2 font-semibold rounded ${
//             auction.type === 'Live' ? 'bg-black text-white hover:bg-gray-800' : 'bg-black text-white hover:bg-gray-800'
//           }`}
//         >
//           {auction.type === 'Live' ? 'Bid Now' : 'Notify Me'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function UpcomingAuctionListPage() {
//   return (
//     <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">
//       {/* Sidebar */}
//       <aside className="w-64 flex-shrink-0 space-y-6">
//         <div>
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
//           />
//         </div>

//         <div>
//           <h3 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">Category</h3>
//           <div className="space-y-1">
//             {categories.map((cat) => (
//               <label key={cat} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
//                 <input type="checkbox" />
//                 <span>{cat}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h3 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">Period</h3>
//           <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none">
//             <option>All Day</option>
//             <option>Last 24 hours</option>
//             <option>Last 7 days</option>
//             <option>This Month</option>
//           </select>
//         </div>

//         <div>
//           <h3 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">Condition</h3>
//           <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none">
//             <option>All</option>
//             <option>New</option>
//             <option>Used</option>
//           </select>
//         </div>

//         <div>
//           <h3 className="font-bold mb-2 text-lg border-b border-gray-300 pb-1">Type Of Sales</h3>
//           <div className="space-y-1">
//             {typeOfSales.map((type) => (
//               <label key={type} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
//                 <input type="checkbox" />
//                 <span>{type}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-sm text-gray-600">Showing 1–12 Of 27 Results</p>
//           <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none text-sm">
//             <option>Default Sorting</option>
//             <option>Highest Bidding</option>
//             <option>Newest</option>
//           </select>
//         </div>

//         {/* Auction Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {auctionDataSample.map((auction) => (
//             <AuctionCard key={auction._id} auction={auction} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }


