import React from 'react'
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import UpcommingAuction from '../Components/UpcommingAuction';
import Leaderboard from '../Components/Leaderboard';

const HomePage = () => {
  return (
   <>
    <div>
          <Hero/>
          <Features/>
          <UpcommingAuction/>
          <Leaderboard/>
    </div>
   </>
  )
}

export default HomePage;