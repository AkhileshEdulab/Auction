
import { RiAuctionFill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuctionDetails } from '../Stores/Slices/auctionSlice';
import { postBid } from '../Stores/Slices/bidSlice';

import Spinner from '../Components/SubComponents/Spinner';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="w-full"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, auctionDetails, auctionBidder } = useSelector((state) => state.auction);
  const { isAuthenticated,user } = useSelector((state) => state.user);

  const [value, setValue] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [amount, setAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
    if (id) dispatch(getAuctionDetails(id));
  }, [dispatch, id, isAuthenticated, navigate]);

  useEffect(() => {
    if (!auctionDetails?.endTime) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(auctionDetails.endTime);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionDetails]);

  const getTimeRemaining = (endTime) => {
    const total = new Date(endTime) - new Date();
    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      mins: Math.floor((total / 1000 / 60) % 60),
      secs: Math.floor((total / 1000) % 60),
    };
  };

  const handleBidSubmit = () => {
    const formData = new FormData();
    formData.append('amount', amount);
    dispatch(postBid(id, formData)).then(() => dispatch(getAuctionDetails(id)));
  };

  const isAuctionEnded = timeLeft.total <= 0;

  const handleChange = (event, newValue) => setValue(newValue);

  const paginatedBidders = Array.isArray(auctionBidder)
    ? auctionBidder.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  const totalPages = Array.isArray(auctionBidder)
    ? Math.ceil(auctionBidder.length / itemsPerPage)
    : 0;

  const getRankSuffix = (index) => {
    const rank = index + 1;
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const getRankColor = (index) => {
    if (index === 0) return 'text-green-500';
    if (index === 1) return 'text-blue-500';
    if (index === 2) return 'text-yellow-500';
    return 'text-gray-500';
  };

  if (!auctionDetails?.startTime || !auctionDetails?.endTime) {
    return (
      <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800 min-h-[300px] flex items-center justify-center">
        {loading ? <Spinner /> : <p className="text-red-500 text-lg font-semibold">Auction not found or failed to load.</p>}
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 bg-white lg:px-30 py-8 text-gray-800 mx-auto ">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 mb-8 text-xl text-gray-600 select-none">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <FaGreaterThan className="text-xs" />
        <Link to="/auctions" className="hover:text-red-500">Auction</Link>
        <FaGreaterThan className="text-xs" />
        <span className="text-gray-500 truncate max-w-xs">{auctionDetails.title}</span>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8  rounded-lg p-6">
        {/* Left - Image */}
        <div className="lg:w-1/2 flex justify-center items-center max-h-[450px] border rounded-lg overflow-hidden">
          <Zoom>
            <img
              src={auctionDetails.image?.url || '/placeholder.png'}
              alt={auctionDetails.title}
              className="max-w-full max-h-[320px] object-contain"
            />
          </Zoom>
        </div>

        {/* Right - Details */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="font-semibold text-xl mb-4">{auctionDetails.title}</h1>
          <p className="text-gray-700 mb-6 truncate">{auctionDetails.description}</p>

          <div className="mb-6 space-y-2">
            <p><strong>Current Bid:</strong> <span className="text-red-600">${auctionDetails.currentBid || auctionDetails.startingBid}</span></p>
            <p><strong>Condition:</strong> <span className="uppercase text-gray-500">{auctionDetails.condition}</span></p>
          </div>

          {/* Countdown */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Time Left</h2>
            <div className="flex gap-3 text-center max-w-xs flex-wrap">
              {isAuctionEnded
                ? ['E', 'N', 'D', 'S'].map((l, i) => (
                    <div key={i} className="bg-gray-50 rounded-md px-4 py-4 shadow w-16 h-16 flex items-center justify-center text-2xl font-extrabold">
                      {l}
                    </div>
                  ))
                : ['days', 'hours', 'mins', 'secs'].map((unit) => (
                    <div key={unit} className="bg-gray-50 rounded-md px-3 py-3 shadow w-16">
                      <div className="text-2xl font-extrabold">{timeLeft[unit]}</div>
                      <div className="text-xs uppercase text-gray-500">{unit}</div>
                    </div>
                  ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 break-words">
              Auction ends: {new Date(auctionDetails.endTime).toLocaleString()}
            </p>
          </div>

          {/* Bidding Input */}
          <div className="flex flex-col items-start gap-4 mt-auto w-full max-w-sm">
            <h1 className="font-semibold text-lg ">Your Max Bid:</h1>
            <div className="flex items-center gap-4 w-full">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center border rounded-md py-2 px-4 flex-grow focus:outline-none"
                disabled={isAuctionEnded}
                min="0"
              />
             <button
              onClick={handleBidSubmit}
              disabled={isAuctionEnded}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
              {isAuctionEnded ? (
                'Closed'
              ) : (
                <>
                  <RiAuctionFill className="text-lg" /> <span>Place Bid</span>
                </>
              )}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 w-full bg-white">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              TabIndicatorProps={{ style: { backgroundColor: '#ef4444' } }}
              aria-label="auction tabs"
            >
              <Tab label="Description" {...a11yProps(0)} sx={{ '&.Mui-selected': { color: '#ef4444' } }} />
              <Tab label="Auction History" {...a11yProps(1)} sx={{ '&.Mui-selected': { color: '#ef4444' } }} />
              <Tab label="Reviews" {...a11yProps(2)} sx={{ '&.Mui-selected': { color: '#ef4444' } }} />
              <Tab label="More Products" {...a11yProps(3)} sx={{ '&.Mui-selected': { color: '#ef4444' } }} />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <CustomTabPanel value={value} index={0}>
            <ul className="list-disc ml-6 text-base text-gray-600 space-y-2">
              {auctionDetails?.description?.split('. ').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <div className="overflow-x-auto">
              <div className="mb-4 bg-gray-300">
            <h2 className="font-semibold text-2xl p-2">Top Bidders</h2>
          </div>
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2">Rank</th>
                    <th className="text-left px-4 py-2">User</th>
                    <th className="text-left px-4 py-2">Bid</th>
                    <th className="text-left px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionBidder?.length > 0 ? (
                    paginatedBidders.map((bidder, index) => (
                      <tr key={index} className="border-t">
                        <td className={`px-4 py-2 ${getRankColor((currentPage - 1) * itemsPerPage + index)} font-semibold`}>
                          {(currentPage - 1) * itemsPerPage + index + 1}{getRankSuffix((currentPage - 1) * itemsPerPage + index)}
                        </td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          <img
                            src={bidder.profileImage || 'https://via.placeholder.com/40'}
                            alt={bidder.userName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          {bidder.userName}
                        </td>
                        <td className="px-4 py-2">${bidder.amount}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {bidder.createdAt
                            ? new Date(bidder.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No bids yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
          <ReviewSection auctionDetails={auctionDetails} user={user}/>
        </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <p className="text-gray-600">More products will be displayed here.</p>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default AuctionItem;


import { FaStar } from 'react-icons/fa';
import { MenuItem, Select } from '@mui/material';

const ratingLabels = ['Terrible', 'Bad', 'Average', 'Good', 'Excellent'];

// Is component ko parrents component me call kiya ja raha h....
function ReviewSection({ auctionDetails,user }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('Average');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('Please write a review before submitting.');
      return;
    }
    const newReview = {
      id: Date.now(),
      name: user?.userName || 'You',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      rating,
      comment,
      label: selectedLabel,
      avatar:user?.profileImage?.url || 'https://via.placeholder.com/50x50.png?text=You',
    };

    setReviews([newReview, ...reviews]); // add new review to the top

    // Reset form
    setRating(5);
    setHover(null);
    setComment('');
    setSelectedLabel('Average');
  };

return (
  <div className="mx-auto p-6 ">
    <h2 className="text-2xl font-semibold mb-6 truncate">
      {reviews.length} review{reviews.length !== 1 ? 's' : ''} {auctionDetails.title}
    </h2>

    {/* Display Reviews */}
    {reviews.length > 0 && (
      <div className="space-y-4 pt-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="font-semibold text-base">
                  {review.name}{' '}
                  <span className="text-gray-500 font-normal text-sm">– {review.date}</span>
                </p>
                {/* stars */}
                <div className="flex text-red-500 mt-2 sm:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-red-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Add Review Form */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">Add a review</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-14 text-red-600 text-xl">
            <label className="block mb-1 font-medium text-black whitespace-nowrap">
              Your rating *
            </label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <FaStar
                      className={
                        starValue <= (hover || rating) ? 'text-red-500' : 'text-gray-300'
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <Select
            sx={{ m: 1, minWidth: 240 }}
            size="small"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          >
            {ratingLabels.map((label, i) => (
              <MenuItem key={i} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Review Text */}
        <div>
          <label className="block mb-1 font-medium">Your review *</label>
          <textarea
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border rounded-md px-4 py-2 resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md w-full sm:w-auto"
        >
          Submit Review
        </button>
      </form>
    </div>
  </div>
);

}





