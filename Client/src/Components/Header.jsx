
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineSupportAgent, MdAccessTime, MdOutlineLeaderboard, MdOutlineSell, } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { LiaSearchSolid, LiaUserCircle } from 'react-icons/lia';
import { HiMenu, HiX } from 'react-icons/hi';
import  Divider from '@mui/material/Divider';
import { FaAngleDown } from 'react-icons/fa6';
import ProfileMenu from './SubComponents/ProfileMenu';
import { logout } from '../Stores/Slices/userSlices';
// components/MobileMenu.jsx
import Button from '@mui/material/Button';
import { IoIosTimer } from "react-icons/io";
import { PiGavel, PiHandCoinsLight, PiEye, } from 'react-icons/pi';
import { BsQuestionCircle, BsInfoCircle, BsPlus, BsDash } from 'react-icons/bs';
import { IoCreateOutline } from "react-icons/io5";
import { RxDashboard } from 'react-icons/rx';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allAuction } = useSelector((state) => state.auction);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => dispatch(logout());

  const formatDayTimeRange = (startIso, endIso) => {
    if (!startIso || !endIso) return 'Invalid time';
    const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    const timeFmt = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const s = new Date(startIso), e = new Date(endIso);
    return `${dayFmt.format(s)}–${dayFmt.format(e)}: ${timeFmt.format(s)}–${timeFmt.format(e)}`;
  };

  const nextAuction = allAuction?.filter((a) => new Date(a.startTime) > new Date())[0];
  const auctionTimeInfo = nextAuction ? formatDayTimeRange(nextAuction.startTime, nextAuction.endTime) : 'No upcoming auctions';

  return (
    <section className="w-full">
      {/* Top Bar */}
      <header className="hidden md:block bg-gray-100 py-2 text-sm text-gray-700 border-b">
        <div className="mx-auto max-w-screen-xl flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <MdOutlineSupportAgent />
            <span className="font-medium cursor-pointer hover:text-red-500 transition">Customer support</span>
            <Divider orientation="vertical" flexItem />
            <AiOutlineMail fontSize={18} />
            <Link to="/contact-us" className="font-medium cursor-pointer hover:text-red-500 transition">
              contact@example.com
            </Link>
            <Divider orientation="vertical" flexItem />
            <MdAccessTime fontSize={18} />
            <Link to="/upcoming" className="font-medium cursor-pointer hover:text-red-500 transition">
              {auctionTimeInfo}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/how to bid" className="px-2 py-1 font-medium rounded-full hover:bg-red-500 hover:text-white transition">HOW TO BID</Link>
            <Link to="/how to sell" className="px-2 py-1 font-medium rounded-full hover:bg-red-500 hover:text-white transition">SELL YOUR ITEM</Link>
            <Divider orientation="vertical" flexItem />
            <div className="relative">
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50 transition cursor-pointer">
                <LiaSearchSolid /> Search
              </button>

              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808c4] bg-opacity-50">
                  <div className="relative bg-white w-full max-w-md p-6 rounded shadow-lg">
                    <button onClick={() => setShowModal(false)} className="absolute top-2 right-3 text-2xl hover:bg-red-500 hover:text-white rounded-full p-1 cursor-pointer">
                      <HiX/>
                    </button>
                    <h2 className="text-xl font-semibold mb-4">What are you looking for?</h2>
                    <input type="text" placeholder="Search something..." className="w-full px-4 py-2 border-b focus:outline-none" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="shadow">
        <div className="mx-auto max-w-screen-xl flex items-center justify-between gap-4 px-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-16 p-2 lg:h-20" />
            </Link>
            <button onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden p-2 rounded-full hover:bg-gray-300">
              {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center text-lg font-semibold text-slate-700">
            {/* Auctions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Trigger Button */}
              <div
                className="px-2 py-1 gap-2 hover:text-red-500 transition-all duration-700 ease-in-out flex items-center cursor-pointer"
              >
                Auctions
                <FaAngleDown
                  className={`ml-1 transition-transform duration-700 ease-in-out ${isHovered ? 'rotate-180' : ''
                    }`}
                />
              </div>

              {/* Dropdown */}
              <div
                className={`absolute left-0 top-full w-48 bg-white shadow-md rounded z-50 overflow-hidden transition-all duration-700 ease-in-out
      ${isHovered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
    `}
              >
                <ul className="flex flex-col text-sm py-2">
                  {['live-Auction', 'Upcoming', 'Auctions'].map((path) => (
                    <li key={path}>
                      <NavLink
                        to={`/${path}`}
                        className={({ isActive }) =>
                          `block px-4 py-2 transition duration-300 hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'
                          }`
                        }
                      >
                        {path}
                      </NavLink>
                    </li>
                  ))}
                  {isAuthenticated && user?.role === 'Auctioneer' && (
                    ['Submit-Commission', 'Create-Auction', 'View-Auction'].map((path) => (
                      <li key={path}>
                        <NavLink to={`/${path}`} className={({ isActive }) =>
                          `block px-4 py-2 transition hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : ''}`
                        }>
                          {path}
                        </NavLink>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <NavLink to="/leaderboard" className={({ isActive }) =>
              `px-2 py-1 transition hover:text-red-500 ${isActive ? 'border-b-2 border-red-500 font-bold' : ''}`
            }>Leaderboard</NavLink>

            {isAuthenticated && user?.role === 'Super Admin' && (
              <NavLink to="/dashboard" className={({ isActive }) =>
                `px-2 py-1 transition hover:text-red-500 ${isActive ? 'border-b-2 border-red-500 font-bold' : ''}`
              }>Dashboard</NavLink>
            )}

            <NavLink to="/about-us" className={({ isActive }) =>
              `px-2 py-1 transition hover:text-red-500 ${isActive ? 'border-b-2 border-red-500 font-bold' : ''}`
            }>About</NavLink>

            <NavLink to="/contact-us" className={({ isActive }) =>
              `px-2 py-1 transition hover:text-red-500 ${isActive ? 'border-b-2 border-red-500 font-bold' : ''}`
            }>Contact</NavLink>

            {/* More Dropdown */}

            <div className="relative " onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} >
              <div
                className="px-2 py-1 gap-2 hover:text-red-500 transition-all duration-[700ms] ease-in-out  flex items-center cursor-pointer "
                onClick={() => setDropdown(!isDropdown)}
              >
                More..
                <FaAngleDown
                  className={`ml-1 transition-all duration-[700ms] ease-in-out transform ${isDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                />
              </div>
              <div
                className={`absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded transition-all duration-1000 ease-in-out z-50
         ${isDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}
       `}
              >
                <ul className="flex flex-col  text-sm py-2">
                  {['How It Works', 'How To Sell', 'How To Bid', 'Faq'].map((path) => (
                    <li key={path}>
                      <NavLink
                        to={`/${path}`}
                        className={({ isActive }) =>
                          ` block px-4 py-2 transition-all duration-[700ms] ease-in-out hover:bg-gray-200 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'hover:text-red-500'}`}
                      >
                        {path}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Login/Profile */}
          <div className="hidden md:flex">
            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="contained" color="error">Login</Button>
              </Link>
            ) : (
              <ProfileMenu />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu {...{ menuOpen, setMenuOpen, isAuthenticated, user, handleLogout }} />
      </nav>
    </section>
  );
};

export default Header;



const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  isAuthenticated,
  user,
  handleLogout,
}) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [auctionOpen, setAuctionOpen] = useState(false);

  const toggleHelp = () => setHelpOpen((prev) => !prev);
  const toggleAuction = () => setAuctionOpen((prev) => !prev);

  const renderNavLink = ({ label, to, Icon }) => (
    <NavLink
      key={to}
      to={to}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 text-[18px] rounded-md transition-colors duration-200 ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100 hover:text-red-600'
        }`
      }
    >
      {Icon && <Icon className="text-[22px]" />} {label}
    </NavLink>
  );

  return menuOpen ? (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-base">

      {/* {renderNavLink({ label: 'Auctions', to: '/auctions', Icon: PiGavel })} */}
      <>
        <button onClick={toggleAuction}
          className="flex justify-between items-center w-full px-3 py-2 rounded-md text-left transition-colors duration-200 hover:bg-red-100 hover:text-red-600"
        >
          <span className="font-medium"> Auction</span>
          {auctionOpen ? <BsDash className="text-[30px]" /> : <BsPlus className="text-[30px]" />}
        </button>
        {auctionOpen && (
          <div className="ml-4 flex flex-col gap-2">
            {[{ label: 'Upcoming', to: '/upcoming', },
            { label: 'Live Auction', to: '/live-auction', },
            { label: 'Auction', to: '/auctions', },
            ].map(renderNavLink)}
          </div>
        )}

        {isAuthenticated && user?.role === 'Auctioneer' && (
          <>
            {auctionOpen && (
              <div className="ml-4 flex flex-col gap-2">
                {[{ label: 'Submit Commission', to: '/submit-commission', Icon: PiHandCoinsLight },
                { label: 'Create Auction', to: '/create-auction', Icon: IoCreateOutline },
                { label: 'View Auction', to: '/view-auction', Icon: PiEye },
                ].map(renderNavLink)}
              </div>
            )}
          </>
        )}
      </>




      {renderNavLink({ label: 'Leaderboard', to: '/leaderboard', Icon: MdOutlineLeaderboard })}
      {isAuthenticated && user?.role === 'Super Admin' && renderNavLink({ label: 'Dashboard', to: '/dashboard', Icon: RxDashboard })}
      {renderNavLink({ label: 'About', to: '/about-us', Icon: BsInfoCircle })}
      {renderNavLink({ label: 'Contact', to: '/contact-us', Icon: LiaUserCircle })}

      {/* Help & Info */}
      <>
        <button
          onClick={toggleHelp}
          className="flex justify-between items-center w-full px-3 py-2 rounded-md text-left transition-colors duration-200 hover:bg-red-100 hover:text-red-600"
        >
          <span className="font-medium">Help & Info</span>
          {helpOpen ? <BsDash className="text-[30px]" /> : <BsPlus className="text-[30px]" />}
        </button>
        {helpOpen && (
          <div className="ml-4 flex flex-col gap-2">
            {[{ label: 'How To Bid', to: '/How To Bid', Icon: PiGavel },
            { label: 'How To Sell', to: '/How To Sell', Icon: MdOutlineSell },
            { label: 'How It Works', to: '/How It Works', Icon: IoIosTimer },
            { label: 'FAQ', to: '/Faq', Icon: BsQuestionCircle },
            ].map(renderNavLink)}
          </div>
        )}
      </>

      {!isAuthenticated ? (
        <Link to="/login" onClick={() => setMenuOpen(false)}>
          <Button variant="contained" color="error" className="w-full hover:brightness-110">
            Login
          </Button>
        </Link>
      ) : (
        <Button variant="outlined" color="error" onClick={handleLogout} className="hover:bg-red-100">
          Logout
        </Button>
      )}
    </div>
  ) : null;
};


