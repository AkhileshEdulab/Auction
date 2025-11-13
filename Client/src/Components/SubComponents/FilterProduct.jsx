
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { Link } from "react-router-dom";
// === Countdown Timer ===
const Countdown = ({ startTime, endTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) return { time: startDiff };
    if (endDiff > 0) return { time: endDiff };
    return null;
  };

  const [timer, setTimer] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  if (!timer) {
    return (
      <div className="bg-red-600 text-white rounded-full px-3 py-1 text-xs font-semibold text-center">
        Auction Ended
      </div>
    );
  }

  const { time } = timer;
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return (
    <div className="bg-white rounded-full py-1 flex space-x-3 justify-center items-center font-semibold shadow-md">
      {[days, hours, minutes, seconds].map((t, i) => (
        <React.Fragment key={i}>
          <div className="text-black text-center">
            <div>{String(t).padStart(2, "0")}</div>
            <div className="text-gray-400 text-[12px]">
              {["Days", "Hours", "Minutes", "Seconds"][i]}
            </div>
          </div>
          {i < 3 && <span className="text-gray-500">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

// === Auction Card ===
const AuctionCard = ({ auction,id }) => {
  const imageUrl =
    auction.image?.url || "https://via.placeholder.com/400x300?text=No+Image";

  const now = new Date();
  const start = new Date(auction.startTime);
  const end = new Date(auction.endTime);

  const isLive = now >= start && now <= end;
  const isUpcoming = now < start;

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-lg transition duration-200 flex flex-col">
      <div className="relative p-2 w-full">
        <div className="w-full h-48 flex items-center justify-center mb-4">
          <img
            src={imageUrl}
            alt={'image'}
            className="max-h-full max-w-full object-contain rounded-md"
          />
        </div>
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${isUpcoming ? "bg-blue-600" : isLive ? "bg-red-600" : "bg-gray-500"
            }`}
        >
          {isUpcoming ? "Upcoming" : isLive ? "Live" : "Ended"}
        </span>
        <div className="absolute -bottom-2 left-3 right-3">
          <Countdown startTime={auction.startTime} endTime={auction.endTime} />
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2">
          {auction.title}
        </h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="text-gray-600 text-sm">
            {isLive ? "Current bid:" : "Starting bid:"}
            <div className="font-semibold text-black">
              $
              {(isLive ? auction.currentBid : auction.startingBid)?.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              )}
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 font-semibold rounded bg-black text-white hover:bg-gray-800 transition">
            {isLive ? <Link  to={`/auction/item/${id}`}>Bid Now</Link> : <Link>Notify Me</Link>}
          </button>
        </div>
      </div>
    </div>
  );
};

// === Filter Drawer ===
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const FilterDrawer = ({
  isOpen,
  toggleDrawer,
  selectedCategories,
  setSelectedCategories,
}) => {
  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Art", "Jewelry & Watches",
    "Books", "Sports & Outdoors", "Health & Beauty", "Toys & Games", "Music & Instruments",
    "Furniture", "Mobile Phones", "Computers & Tablets", "Gaming", "Motorcycles",
    "Bicycles", "Movies & TV Memorabilia"
  ];



  const handleDelete = (chipToDelete) => {
    setSelectedCategories((prev) =>
      prev.filter((chip) => chip !== chipToDelete)
    );
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleDrawer}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 p-6 shadow-xl transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl"
          onClick={toggleDrawer}
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-semibold mb-6">Filters</h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border rounded pl-10 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Category Dropdown */}
        <FormControl sx={{ width: "100%", mb: 4 }}>
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  // <Chip key={value} label={value} />
                  <Chip
                    key={value}
                    label={value}
                    onMouseDown={(event) => event.stopPropagation()} // ✅ FIXED
                    onDelete={() => handleDelete(value)}             // ✅ FIXED
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => {
            toggleDrawer();
          }}
        >
          Apply Filters
        </button>
      </aside>
    </>
  );
};

export { Countdown, AuctionCard, FilterDrawer };

