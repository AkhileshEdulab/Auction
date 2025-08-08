import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuction } from '../../../Stores/Slices/superAdminSlice';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa6'; // MUI Pagination import
import { Pagination } from '@mui/material';

const ITEMS_PER_PAGE = 6;

const AuctionItemDelete = () => {
  const dispatch = useDispatch();
  const { allAuction = [], loading } = useSelector(state => state.auction);

  const [page, setPage] = useState(1);

  const handleDeleteAuction = (id) => {
    if (window.confirm('Are you sure you want to delete this auction item?')) {
      dispatch(deleteAuction(id));
    }
  };

  const totalPages = Math.ceil(allAuction.length / ITEMS_PER_PAGE);
  const paginatedItems = allAuction.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="overflow-x-auto py-6">
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-md">
        <thead className="bg-gray-700 text-white text-xs sm:text-sm">
          <tr>
            <th className="py-2 px-2 sm:px-4 text-left">Image</th>
            <th className="py-2 px-2 sm:px-4 text-left">Title</th>
            <th className="py-2 px-2 sm:px-4 text-left">Start Price</th>
            <th className="py-2 px-2 sm:px-4 text-left">Condition</th>
            <th className="py-2 px-2 sm:px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm">
          {paginatedItems.length > 0 ? (
            paginatedItems.map(auction => (
              <tr key={auction._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-2 px-2 sm:px-4">
                  <img
                    src={auction.image?.url}
                    alt={auction.title}
                    className="sm:w-16 sm:h-16 sm:rounded object-cover rounded-full border"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                </td>
                <td className="py-2 px-2 sm:px-4 text-gray-800 max-w-[150px] truncate" title={auction.title}>
                  {auction.title}
                </td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 font-medium">
                  ${auction.startingBid}
                </td>
                <td className="py-2 px-2 sm:px-4 text-gray-600">{auction.condition}</td>
                <td className="py-2 px-2 sm:px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/auction/item/${auction._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition"
                    >
                      <FaEye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteAuction(auction._id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition disabled:opacity-50"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
                No auction items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Material UI Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="error"
            size="medium"
            siblingCount={1}
            boundaryCount={1}
          />
        </div>
      )}
    </div>
  );
};

export default AuctionItemDelete;
