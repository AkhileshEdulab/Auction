import React, { useEffect } from 'react'
import HomePage from './Pages/HomePage'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Components/Header';
import FAQ from './Pages/FAQ';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import CommissionProof from './Components/CommissionProof';
import { useDispatch } from 'react-redux';
import { featchLeaderboard, fetchUser } from './Stores/Slices/userSlices';
import { getAllAuction, getAuctionDetails } from './Stores/Slices/auctionSlice';
import AboutUs from './Pages/AboutUs';
import UpcommingAuctionListed from './Components/UpcommingAuctionListed';
import LeaderboardPage from './Pages/LeaderboardPage';
import Auctions from './Pages/Auctions';
import AuctionItem from './Pages/AuctionItem';
import CreateAuction from './Pages/CreateAuction';
import ViewMyAuction from './Pages/ViewMyAuction';
import ViewAuctionDetails from './Pages/ViewAuctionDetails';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUser()),
    dispatch(getAllAuction()),
    dispatch(featchLeaderboard())
  },[dispatch])
  return (
   <>
   <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/faq" element={<FAQ/>} />
      <Route path="/about-us" element={<AboutUs/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/submit-commission" element={<CommissionProof/>} />
      <Route path="/upcoming" element={<UpcommingAuctionListed/>} />
      <Route path="/leaderboard" element={<LeaderboardPage/>} />
      <Route path="/auctions" element={<Auctions/>} />
      <Route path="/auction/item/:id" element={<AuctionItem />} />
      <Route path='/create-auction' element={<CreateAuction/>}/>
      <Route path='/view-auction' element={<ViewMyAuction/>}/>
      <Route path='/auction/details/:id' element={<ViewAuctionDetails/>}/>

      {/* Fallback route for unmatched URLs */}
        <Route path="*" element={<div className="p-4 text-center text-red-600 font-semibold">404 - Page Not Found</div>} />
    </Routes>
    <ToastContainer
       position="top-right"             // Top-right corner of the screen
       autoClose={3000}                 // Closes toast after 3 seconds
       hideProgressBar={false}         // Show progress bar
       newestOnTop={false}             // Show newest toast at bottom
       closeOnClick                    // Close on click
       rtl={false}                     // Right-to-left support (false = LTR)
       pauseOnFocusLoss                // Pause toast if user switches tab
       draggable                       // Allow drag to dismiss
       pauseOnHover                    // Pause timeout on hover
       theme="light"                   // Options: "light", "dark", "colored"
    />
   </Router>
   </>
  )
}

export default App