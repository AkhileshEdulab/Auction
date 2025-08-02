

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const { leaderboard = [], loading } = useSelector((state) => state.user);

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Top 10 Bidders Leaderboard
        </h2>
        <Link
          to="/leaderboard"
          className="border-2 font-semibold text-sm sm:text-base hover:bg-red-500 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg"
        >
          Go to Leaderboard
        </Link>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full table-auto text-sm sm:text-base">
          <thead className="bg-gray-700 text-white">
            <tr className=''>
              <th className="text-left px-4 py-3">Rank</th>
              <th className="text-left px-4 py-3">Bidder</th>
              <th className="text-center px-4 py-3">Bid Expenditure</th>
              <th className="text-center px-4 py-3">Auctions Won</th>
              <th className="text-center px-4 py-3">LastTime Bid</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.slice(0, 10).map((bidder, index) => (
                <tr
                  key={bidder._id || index}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">{bidder.rank || index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={
                        bidder.profileImage?.url ||
                        `https://i.pravatar.cc/40?img=${index + 1}`
                      }
                      alt={bidder.userName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="text-gray-800 truncate max-w-[150px]">
                      {bidder.userName || 'Anonymous'}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 font-medium text-green-600">
                    ${bidder.moneySpent?.toLocaleString() || '0'}
                  </td>
                  <td className="text-center px-4 py-3">{bidder.auctionsWon || 0}</td>
                  <td className="text-center px-4 py-3 text-gray-500 text-xs sm:text-sm">
                    {bidder.lastBid || 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                  No leaderboard data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
