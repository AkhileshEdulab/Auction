import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const bidders = [
  {
    rank: 1,
    name: 'Alice Johnson',
    profile: 'https://i.pravatar.cc/40?img=1',
    totalBids: 15200,
    itemsWon: 12,
    lastBid: '2025-07-14 14:32:10',
  },
  {
    rank: 2,
    name: 'Mark Evans',
    profile: 'https://i.pravatar.cc/40?img=2',
    totalBids: 13800,
    itemsWon: 10,
    lastBid: '2025-07-14 14:20:47',
  },
  {
    rank: 3,
    name: 'Priya Singh',
    profile: 'https://i.pravatar.cc/40?img=3',
    totalBids: 12450,
    itemsWon: 9,
    lastBid: '2025-07-14 14:15:22',
  },
  {
    rank: 4,
    name: 'Carlos Rivera',
    profile: 'https://i.pravatar.cc/40?img=4',
    totalBids: 11900,
    itemsWon: 8,
    lastBid: '2025-07-14 13:59:34',
  },
  {
    rank: 5,
    name: 'Emily Chen',
    profile: 'https://i.pravatar.cc/40?img=5',
    totalBids: 10670,
    itemsWon: 7,
    lastBid: '2025-07-14 13:45:19',
  },
  {
    rank: 6,
    name: "David O'Connell",
    profile: 'https://i.pravatar.cc/40?img=6',
    totalBids: 9980,
    itemsWon: 6,
    lastBid: '2025-07-14 13:30:02',
  },
  {
    rank: 7,
    name: 'Fatima Al-Mansour',
    profile: 'https://i.pravatar.cc/40?img=7',
    totalBids: 9120,
    itemsWon: 5,
    lastBid: '2025-07-14 13:22:44',
  },
  {
    rank: 8,
    name: 'Lucas Bennett',
    profile: 'https://i.pravatar.cc/40?img=8',
    totalBids: 8870,
    itemsWon: 5,
    lastBid: '2025-07-14 13:10:11',
  },
  {
    rank: 9,
    name: 'Sara Goldstein',
    profile: 'https://i.pravatar.cc/40?img=9',
    totalBids: 8540,
    itemsWon: 4,
    lastBid: '2025-07-14 12:59:58',
  },
  {
    rank: 10,
    name: 'Tomislav Petrović',
    profile: 'https://i.pravatar.cc/40?img=10',
    totalBids: 8100,
    itemsWon: 4,
    lastBid: '2025-07-14 12:45:35',
  },
];

const Leaderboard = () => {
  return (
    <div className="px-20">
<div className="flex justify-between mb-2">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Top 10 Bidders Leaderboard</h2>
         <Link to={'/leaderboard'} className='border-2 font-semibold hover:bg-red-500 hover:text-white transition-all ease-in-out duration-700 items-center px-4 py-2 rounded-lg'>Go to Leaderboard</Link>
        </div>      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Rank</th>
              <th className="text-left px-4 py-2">Bidder</th>
              <th className="text-center px-4 py-2">BidExpendture ($)</th>
              <th className="text-center px-4 py-2">Auctions Won</th>
              <th className="text-center px-4 py-2">Last Bid Time</th>
            </tr>
          </thead>
          <tbody>
            {bidders.slice(0,10).map((bidder,index) => (
              <tr key={bidder._id || index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{bidder.rank}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={bidder.profile}
                    alt={bidder.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-800">{bidder.name}</span>
                </td>
                <td className="text-center px-4 py-3 font-medium text-green-600">
                  ${bidder.totalBids.toLocaleString()}
                </td>
                <td className="text-center px-4 py-3">{bidder.itemsWon}</td>
                <td className="text-center px-4 py-3 text-sm text-gray-500">{bidder.lastBid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;



// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Leaderboard = () => {
//   const { leaderboard, loading } = useSelector((state) => state.user);

  

//   return (
//     <div className="px-20 py-6">
//         <div className="flex justify-between mb-2">
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Top 10 Bidders Leaderboard</h2>
//          <Link to={'/leaderboard'} className='border-2 font-semibold hover:bg-red-500 hover:text-white transition-all ease-in-out duration-700 items-center px-4 py-2 rounded-lg'>Go to Leaderboard</Link>
//         </div>
//       <div className="overflow-x-auto border">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left px-4 py-2">Rank</th>
//               <th className="text-left px-4 py-2">Bidder</th>
//               <th className="text-center px-4 py-2">Bid Expenditure ($)</th>
//               <th className="text-center px-4 py-2">Auctions Won</th>
//               <th className="text-center px-4 py-2">Last Bid Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.slice(0, 10).map((bidder, index) => (
//               <tr key={bidder._id || index} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-3">{bidder.rank || index + 1}</td>
//                 <td className="px-4 py-3 flex items-center gap-3">
//                   <img
//                     src={bidder.profileImage?.url || `https://i.pravatar.cc/40?img=${index + 1}`}
//                     alt={bidder.userName}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span className="text-gray-800">{bidder.userName}</span>
//                 </td>
//                 <td className="text-center px-4 py-3 font-medium text-green-600">
//                   ${bidder.moneySpent?.toLocaleString() || '0'}
//                 </td>
//                 <td className="text-center px-4 py-3">{bidder.auctionsWon || 0}</td>
//                 <td className="text-center px-4 py-3 text-sm text-gray-500">
//                   {bidder.lastBid || 'N/A'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
