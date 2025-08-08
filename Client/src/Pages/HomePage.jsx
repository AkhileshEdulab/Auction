import React from 'react'
import Features from '../Components/Features';
import UpcommingAuction from '../Components/UpcommingAuction';
import HeroSlider from '../Components/SubComponents/HeroSlider';
import FAQ from './FAQ';
import AboutUs from './AboutUs';


const HomePage = () => {
  return (
   <>
    <div>
       <HeroSlider />
          <UpcommingAuction/>
          <Features/>
          <FAQ/>
          <AboutUs/>
    </div>
   </>
  )
}

export default HomePage;