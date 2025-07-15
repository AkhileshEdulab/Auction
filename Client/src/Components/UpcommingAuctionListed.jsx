
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// // Sidebar filter component (static UI only)
// function SidebarFilters({ categories, typeOfSales }) {
//   return (
//     <aside className="w-64 p-4 space-y-6 border-r border-gray-200">
//       <input
//         type="search"
//         placeholder="Search"
//         className="w-full p-2 border rounded"
//       />

//       <div>
//         <h3 className="font-bold mb-2 border-b border-gray-300 pb-1">Category</h3>
//         {categories.map((cat) => (
//           <label key={cat} className="block mb-1 cursor-pointer">
//             <input type="checkbox" className="mr-2" /> {cat}
//           </label>
//         ))}
//       </div>

//       <div>
//         <h3 className="font-bold mb-2 border-b border-gray-300 pb-1">Type Of Sales</h3>
//         {typeOfSales.map((type) => (
//           <label key={type} className="block mb-1 cursor-pointer">
//             <input type="checkbox" className="mr-2" /> {type}
//           </label>
//         ))}
//       </div>
//     </aside>
//   );
// }

// // Countdown component inside AuctionCard
// function Countdown({ endTime }) {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     function updateTimer() {
//       const now = Date.now();
//       const distance = new Date(endTime).getTime() - now;
//       if (distance > 0) {
//         setTimeLeft({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((distance / (1000 * 60)) % 60),
//           seconds: Math.floor((distance / 1000) % 60),
//         });
//       } else {
//         setTimeLeft(null); // Auction ended
//       }
//     }
//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [endTime]);

//   if (!timeLeft) return <div className="text-red-600 font-semibold">Auction Ended</div>;

//   return (
//     <div className="bg-white rounded-full px-4 py-1 text-xs flex space-x-3 justify-center items-center font-semibold shadow-md w-max mx-auto sm:mx-0">
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

// // Auction card component
// function AuctionCard({ auction }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-lg transition duration-200">
//       <div className="relative">
//         <img
//           src={auction.image.url}
//           alt={auction.title}
//           className="w-full h-48 object-cover rounded-t"
//         />
//         <span
//           className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${
//             auction.type === 'Live' ? 'bg-red-600' : 'bg-blue-600'
//           }`}
//         >
//           {auction.type === 'Live' ? 'Live' : 'Upcoming'}
//         </span>
//         <div className="absolute bottom-3 left-3 right-3">
//           <Countdown endTime={auction.endTime} />
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{auction.title}</h3>

//         {auction.type === 'Live' ? (
//           <>
//             <div className="text-gray-600 text-xs">Current bid:</div>
//             <div className="font-bold text-lg">${auction.currentBid?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
//             <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">
//               Lot # {auction.lotNumber}
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="text-gray-600 text-xs flex">Starting bid:</div>
//             <div className="font-bold text-lg">${auction.startingBid?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
//             <div className="text-xs mt-1 px-2 py-1 inline-block bg-green-100 text-green-700 rounded">
//               Sku # {auction.sku}
//             </div>
//           </>
//         )}

//         <div className="flex items-center mt-3 space-x-2 text-gray-500 text-xs">
//           <svg
//             className="w-4 h-4 text-gray-400"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//           </svg>
//           <span>{auction.seller}</span>
//         </div>

//         <button
//           className="mt-4 w-full py-2 font-semibold rounded bg-black text-white hover:bg-gray-800 transition"
//         >
//           {auction.type === 'Live' ? 'Bid Now' : 'Notify Me'}
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main page component rendering dynamic list
// export default function UpcommingAuctionListed() {
//   const {allAuction} = useSelector(state=>state.auction);

//   const today = new Date();
//   const todayString = today.toDateString();

//   const auctionStartingToday = allAuction.filter(item=>{
//   const auctionDate = new Date(item.startTime)
//   return auctionDate.toDateString() == todayString;
//   })

//   console.log("all auction",allAuction);
//   console.log("start auction",auctionStartingToday);

  
//   const categories = [
//     'Antiques',
//     'Automotive',
//     'Books & comics',
//     'Digital art',
//     'Fashion',
//     'Gadget',
//     'Jewelry',
//     'Old Coin',
//     'Real Estate',
//   ];

//   const typeOfSales = ['Upcoming', 'Latest', 'Highest Bidding', 'Live Auction', 'Popular'];

//   // Sample auctions (replace with real data or fetch)
// //   const auctions = [
// //     {
// //       id: 1,
// //       imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
// //       title: 'Canvas & culture brush withn elegance auction.',
// //       currentBid: 10180,
// //       lotNumber: '576894',
// //       type: 'Live',
// //       endTime: new Date(Date.now() + 20431 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },
// //     {
// //       id: 2,
// //       imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
// //       title: 'Rare Find Signed Copy of The KingFlok table.',
// //       startingBid: 2898,
// //       sku: 'Kinflok-26',
// //       type: 'Upcoming',
// //       endTime: new Date(Date.now() + 20431 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },
// //     {
// //       id: 3,
// //       imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
// //       title: "Vintag Classic Leather bound God’s leading lady.",
// //       startingBid: 8974,
// //       sku: 'T.D_J-300',
// //       type: 'Upcoming',
// //       endTime: new Date(Date.now() + 20421 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },
// //     {
// //       id: 4,
// //       imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
// //       title: "Vintag Classic Leather bound God’s leading lady.",
// //       startingBid: 8974,
// //       sku: 'T.D_J-300',
// //       type: 'Upcoming',
// //       endTime: new Date(Date.now() + 20421 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },{
// //       id: 5,
// //       imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
// //       title: "Vintag Classic Leather bound God’s leading lady.",
// //       startingBid: 8974,
// //       sku: 'T.D_J-300',
// //       type: 'Upcoming',
// //       endTime: new Date(Date.now() + 20421 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },{
// //       id: 6,
// //       imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
// //       title: "Vintag Classic Leather bound God’s leading lady.",
// //       startingBid: 8974,
// //       sku: 'T.D_J-300',
// //       type: 'Upcoming',
// //       endTime: new Date(Date.now() + 20421 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 33 * 60 * 1000 + 15 * 1000),
// //       seller: 'Egens lab',
// //     },
// //     // Add more auctions here ...
// //   ];

//   return (
//     <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">
//       <SidebarFilters categories={categories} typeOfSales={typeOfSales} />

//       <main className="flex-1">
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-sm text-gray-600">Showing 1–12 Of 27 Results</p>
//           <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none text-sm">
//             <option>Default Sorting</option>
//             <option>Highest Bidding</option>
//             <option>Newest</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {auctionStartingToday.map((auction) => (
//             <AuctionCard key={auction.id} auction={auction} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }




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

// Countdown Timer Component
// function Countdown({ endTime }) {
//   const [timeLeft, setTimeLeft] = useState(null);

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date().getTime();
//       const end = new Date(endTime).getTime();
//       const distance = end - now;

//       if (distance > 0) {
//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((distance / (1000 * 60)) % 60);
//         const seconds = Math.floor((distance / 1000) % 60);

//         setTimeLeft({ days, hours, minutes, seconds });
//       } else {
//         setTimeLeft(null);
//       }
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, [endTime]);

//   if (!timeLeft) {
//     return (
//       <div className="bg-red-600 text-white rounded-full px-3 py-1 text-xs text-center font-semibold">
//         Auction Ended
//       </div>
//     );
//   }

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
    'Antiques',
    'Automotive',
    'Books & comics',
    'Digital art',
    'Fashion',
    'Gadget',
    'Jewelry',
    'Old Coin',
    'Real Estate',
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
