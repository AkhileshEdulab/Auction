import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsSliders } from "react-icons/bs";
import {
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import { AuctionCard, FilterDrawer } from "./SubComponents/FilterProduct";
import Spinner from "./SubComponents/Spinner";




// === Main Component ===
const LiveAuction= () => {
  const { allAuction,loading } = useSelector((state) => state.auction);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const today = new Date().toDateString();

  const filteredAuctions = allAuction?.filter((item) => {
  const now = new Date();
  const start = new Date(item.startTime);
  const end = new Date(item.endTime);

  // Live auction = current time is between start and end
  const isLive = now >= start && now <= end;

  const matchesCategory =
    selectedCategories.length === 0 || selectedCategories.includes(item.category);

  return isLive && matchesCategory;
}) || [];
  const [sortOption, setSortOption] = useState(10); // default = "Default Sorting"

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
   <>
   {loading ? (<Spinner/>):(
     <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-lg text-gray-600">
          Showing {filteredAuctions.length} Live Auctions
        </p>

        <div className="flex flex-wrap gap-4 md:gap-6 items-center">
          {/* Filters Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 hover:text-red-600 text-xl transition-colors duration-200"
          >
            <BsSliders />
            Filters
          </button>

          {/* MUI Select Dropdown */}
          <FormControl
            sx={{
              m: 1,
              minWidth: 160,
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px", // fully rounded
                "&.Mui-focused fieldset": {
                  borderColor: "#dc2626",
                },
              },
              "& .MuiSelect-icon": {
                color: "red",
              },
            }}
            size="small"
          >
            <Select
              value={sortOption}
              onChange={handleSortChange}
            >
              <MenuItem value={10}>Default Sorting</MenuItem>
              <MenuItem value={20}>Highest Bidding</MenuItem>
              <MenuItem value={30}>Newest</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Auctions Grid or Empty State */}
      {filteredAuctions.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-12">
          No auctions found for selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction._id} id={auction._id} auction={auction} />
          ))}
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={drawerOpen}
        toggleDrawer={() => setDrawerOpen(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
   )}
   </>
  );
};

export default LiveAuction;



