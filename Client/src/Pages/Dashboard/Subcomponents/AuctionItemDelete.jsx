import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuction } from '../../../Stores/Slices/superAdminSlice';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa6';

const AuctionItemDelete = () => {
  const dispatch = useDispatch();
  const { allAuction, loading } = useSelector(state => state.auction);

  const handleDeleteAuction = (id) => {
    if (window.confirm('Are you sure you want to delete this auction item?')) {
      dispatch(deleteAuction(id));
    }
  };

  return (
    <div className="overflow-x-auto py-6">
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-md overflow-hidden">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-3 px-4 text-sm font-semibold text-left">Image</th>
            <th className="py-3 px-4 text-sm font-semibold text-left">Title</th>
            <th className="py-3 px-4 text-sm font-semibold text-left">Start Price</th>
            <th className="py-3 px-4 text-sm font-semibold text-left">Condition</th>
            <th className="py-3 px-4 text-sm font-semibold text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {allAuction && allAuction.length > 0 ? (
            allAuction.map((auction) => (
              <tr key={auction._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <img
                    src={auction.image?.url}
                    alt={auction.title}
                    className="w-16 h-16 object-cover rounded border"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                </td>

                <td
                  className="py-3 px-4 text-gray-800 max-w-xs truncate whitespace-nowrap overflow-hidden"
                  title={auction.title}
                >
                  {auction.title}
                </td>

                <td className="py-3 px-4 text-gray-700 font-medium">${auction.startingBid}</td>
                <td className="py-3 px-4 text-gray-600">{auction.condition}</td>

                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/auction/details/${auction._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition-all"
                    >
                      <FaEye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteAuction(auction._id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all disabled:opacity-50"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No auction items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
