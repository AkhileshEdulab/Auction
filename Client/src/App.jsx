import React, { useEffect } from 'react'
import HomePage from './Pages/HomePage'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Header from './Components/Header';
import FAQ from './Pages/FAQ';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import CommissionProof from './Components/CommissionProof';
import { useDispatch } from 'react-redux';
import { featchLeaderboard, fetchUser } from './Stores/Slices/userSlices';
import { getAllAuction} from './Stores/Slices/auctionSlice';
import AboutUs from './Pages/AboutUs';
import UpcommingAuctionListed from './Components/UpcommingAuctionListed';
import LeaderboardPage from './Pages/LeaderboardPage';
import Auctions from './Pages/Auctions';
import AuctionItem from './Pages/AuctionItem';
import CreateAuction from './Pages/CreateAuction';
import ViewMyAuction from './Pages/ViewMyAuction';
import Dashboard from './Pages/Dashboard/Dashboard';
import Footer from './Components/Footer';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HowToBid from './Components/SubComponents/HowToBid';
import Contact from './Components/Contact';
import HowToSell from './Components/SubComponents/HowToSell';
import UserProfile from './Components/UserProfile';
import HowItWorks from './Components/SubComponents/HowItsWork';
import NotFoundPage from './Pages/NotFoundPage';
import ScrollToTopButton from './Components/SubComponents/ScrollToTopButton';

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
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/how to bid' element={<HowToBid/>}/>
      <Route path='/how to sell' element={<HowToSell/>}/>
      <Route path='/how it works' element={<HowItWorks/>}/>
      <Route path='/contact-us' element={<Contact/>}/>
      <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    <Footer/>
    <ScrollToTopButton />
    <ToastContainer
       position="top-right"             
       autoClose={3000}                
       hideProgressBar={false}         
       newestOnTop={false}             
       closeOnClick                    
       rtl={false}                     
       pauseOnFocusLoss               
       draggable                       
       pauseOnHover                    
       theme="light"                  
    />
   </Router>
   </>
  )
}

export default App