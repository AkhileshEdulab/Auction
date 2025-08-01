

import React, { useEffect, useState } from 'react';
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineMail } from 'react-icons/ai';
import { MdAccessTime } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { GiThorHammer } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import ProfileMenu from './SubComponents/ProfileMenu'
import { LiaLanguageSolid } from "react-icons/lia";
import { logout } from '../Stores/Slices/userSlices';
import { FaAngleDown,} from "react-icons/fa6";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState("Language");
  const languages = ["English", "Hindi"];
  
const { allAuction } = useSelector((state) => state.auction);

  // Utility function to format day and time range
  const formatDayTimeRange = (startIso, endIso) => {
    if (!startIso || !endIso) return 'Invalid time';

    const startDate = new Date(startIso);
    const endDate = new Date(endIso);

    // Format day as short weekday name like Mon, Tue, etc.
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    // Format time in 24h format, hh:mm
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const startDay = dayFormatter.format(startDate); 
    const endDay = dayFormatter.format(endDate);     
    const startTime = timeFormatter.format(startDate); 
    const endTime = timeFormatter.format(endDate);     

    return `${startDay}–${endDay}: ${startTime}–${endTime}`;
  };

  const startTimeUTC = allAuction?.[0]?.startTime;
  const endTimeUTC = allAuction?.[0]?.endTime;

  const auctionTimeInfo = formatDayTimeRange(startTimeUTC, endTimeUTC);

//   const formatTime = (isoTime) => {
//   const date = new Date(isoTime);
//   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// };
// const startTimeFormatted = formatTime(allAuction?.[0]?.startTime);
// const endTimeFormatted = formatTime(allAuction?.[0]?.endTime);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
  };
 const handleLogout = () => {
   dispatch(logout()); 
 };
  return (
    <section className="w-full">
      {/* Top Bar */}
      <header className="bg-gray-100 py-2 text-sm text-gray-700 border-b hidden md:block">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            < MdOutlineSupportAgent />
            <span className=' font-medium transition-all ease-in-out duration-1000 hover:text-red-500 cursor-pointer'>Customer support</span>
            <Divider orientation="vertical" flexItem />
            <AiOutlineMail fontSize={18}/>
            <span className=' font-medium transition-all ease-in-out duration-1000 hover:text-red-500 cursor-pointer'>contact@example.com</span>
            <Divider orientation="vertical" flexItem />
            <MdAccessTime fontSize={18}/>
            <span className=' font-medium transition-all ease-in-out duration-1000 hover:text-red-500 cursor-pointer'>{auctionTimeInfo}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to={'/how to bid'} className="rounded-full border-1 px-2 py-1 font-medium hover:bg-red-500 hover:text-white transition-all ease-in-out duration-1000 ">HOW TO BID</Link>
            <Link to={'/how to sell'} className="rounded-full border-1 px-2 py-1 font-medium hover:bg-red-500 hover:text-white transition-all ease-in-out duration-1000 ">SELL YOUR ITEM</Link>
            <Divider orientation="vertical" flexItem />
            
           <div className="fontSize={18}relative inline-block text-right">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center font-medium w-40 px-4 py-2 bg-white border border-gray-300 rounded-md  hover:bg-gray-50 transition-all"
      >
         < LiaLanguageSolid fontSize={18}/>
        {selected}
       
      </button>

      <div
        className={`origin-top-left absolute z-10 w-40 mt-2 shadow-lg bg-white  transition-all duration-200 transform ${
          open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <ul className="py-1">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => handleSelect(lang)}
              className="block px-4 py-2 text-sm text-gray-9 font-medium hover:bg-red-500 hover:text-white cursor-pointer"
            >
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto flex gap-4 justify-between items-center px-4 py-3 md:py-5 md:px-8">
          {/* Logo */}
          <div className="flex justify-between items-center w-full md:w-auto">
           <Link to={'/'}>
            <img
              src="https://autobid.modeltheme.com/wp-content/themes/autobid/images/logo-autobid.svg"
              alt="Logo"
              className="h-14"
            />
           </Link>
            <button
              className="md:hidden text-3xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-lg text-slate-700 font-semibold">
           
    <div
      className="relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
      className="px-2 py-1 gap-2 hover:text-red-500 transition-all duration-[700ms] ease-in-out  flex items-center cursor-pointer "
      onClick={() => setIsHovered(!isHovered)}
    >
      Auctions 
       <FaAngleDown
          className={`ml-1 transition-all duration-[700ms] ease-in-out transform ${
            isHovered ? 'rotate-180' : 'rotate-0'
          }`}
        />
    </div>
      {/* Dropdown */}
      <div
        className={`absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded transition-all duration-1000 ease-in-out z-50
        ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      >
        <ul className="flex flex-col text-black text-sm py-2">
          <li>
            <NavLink
              to="/live-auctions"
              className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
              Live Auctions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
              Upcoming
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auctions"  className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
              All Auction
            </NavLink>
          </li>
          {/* Role-based options */}
          {isAuthenticated && user?.role === 'Auctioneer' && (
            <>
              <li>
                <NavLink
                  to="/submit-commission" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
                >
                  Submit Commission
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-auction" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
                >
                  Create Auction
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/view-auction" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
                >
                  View Auction
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div> 
               <NavLink to="/leaderboard" className={({ isActive }) =>
                `px-2 py-1 transition-all duration-[700ms] ease-in-out ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500 '}`}>Leaderboard</NavLink>

           

            {isAuthenticated && user?.role === 'Super Admin' && (
              <NavLink to="/dashboard" className={({ isActive }) =>
                `px-2 py-1 transition-all duration-[700ms] ease-in-out ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}>Dashboard</NavLink>
            )}

            <NavLink to="/about-us" className={({ isActive }) =>
              `px-2 py-1 transition-all duration-[700ms] ease-in-out ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}>About</NavLink>

            <NavLink to="/contact-us" className={({ isActive }) =>
              `px-2 py-1 transition-all duration-[700ms] ease-in-out ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}>Contact</NavLink>

     <div className="relative " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
      <div
      className="px-2 py-1 gap-2 hover:text-red-500 transition-all duration-[700ms] ease-in-out  flex items-center cursor-pointer "
      onClick={() => setIsHovered(!isHovered)}
    >
      More..
       <FaAngleDown
          className={`ml-1 transition-all duration-[700ms] ease-in-out transform ${
            isHovered ? 'rotate-180' : 'rotate-0'
          }`}
        />
    </div>
      {/* Dropdown */}
      <div
        className={`absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded transition-all duration-1000 ease-in-out z-50
        ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      >
        <ul className="flex flex-col text-black text-sm py-2">
          <li>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
              How Its Work
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how-to-sell" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
             How To Sell
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how to bid"  className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
            >
              How To Bid
            </NavLink>
          </li>
          <li>
                <NavLink
                  to="/faq" className={({ isActive }) =>
              ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
             
                >
                  FAQ
                </NavLink>
              </li>
        </ul>
      </div>
    </div>
          </div>

          <div className="hidden md:flex">
            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="contained" color="error">Login</Button>
              </Link>
              
            ) : (
              <ProfileMenu/>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-base">
            <NavLink to="/auctions" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center '><GiThorHammer />Auctions</NavLink>
              <NavLink to="/leaderboard" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'><MdLeaderboard />Leaderboard</NavLink>
            {isAuthenticated && user?.role === 'Auctioneer' && (
              <>
                <NavLink to="/submit-commission" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'>Submit Commission</NavLink>
                <NavLink to="/create-auction" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'>Create Auction</NavLink>
                <NavLink to="/view-auction" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'>View Auction</NavLink>
              </>
            )}
            {isAuthenticated && user?.role === 'Super Admin' && (
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'><RxDashboard />Dashboard</NavLink>
            )}
            <NavLink to="/about-us" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'>< BsFillInfoSquareFill/>About</NavLink>
            <NavLink to="/how-it-works" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'><SiGooglesearchconsole/>How It Works</NavLink>
            <NavLink to="/faq" onClick={() => setMenuOpen(false)} className='flex gap-2 items-center'><FaQuestionCircle />FAQ</NavLink>
            {!isAuthenticated ? (
              <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="contained" color="error">Login</Button>
              </Link>
              </>
            ) : (
             
               <><Button variant="outlined" color="error"onClick={() => setMenuOpen(false)} onChange={ handleLogout}>Logout</Button></>
            )}
          </div>
        )}
      </nav>
    </section>
  );
};

export default Header;
