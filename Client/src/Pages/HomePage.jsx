import React from 'react'
import Features from '../Components/Features';
import UpcommingAuction from '../Components/UpcommingAuction';
import Leaderboard from '../Components/Leaderboard';
import HeroSlider from '../Components/SubComponents/HeroSlider';

const HomePage = () => {
  return (
   <>
    <div>
         <div className="py-6 px-6 md:px-14 lg:px-14">
        <HeroSlider />
         </div>
          <Features/>
          <UpcommingAuction/>
          <Leaderboard/>
    </div>
   </>
  )
}

export default HomePage;