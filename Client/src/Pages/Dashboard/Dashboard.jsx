import React, { useEffect, useState } from 'react'
import PaymentProof from './Subcomponents/PaymentProof';
import UserGraph from './Subcomponents/UserGraph';
import AuctionItemDelete from './Subcomponents/AuctionItemDelete';
import PaymentGraph from './Subcomponents/PaymentGraph';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/SubComponents/Spinner';
import { clearAllSuperAdminErrors, fetchAllUser, getAllPaymentProof, monthlyRevenue } from '../../Stores/Slices/superAdminSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {loading} = useSelector(state=>state.superAdmin);
    const dispatch = useDispatch();

   
    useEffect(()=>{
        dispatch(monthlyRevenue())
        dispatch(getAllPaymentProof())
        dispatch(fetchAllUser())
        dispatch(clearAllSuperAdminErrors())
    },[])

     const {user,isAuthenticated} = useSelector(state=>state.user)
    const navigateTo = useNavigate();
    useEffect(()=>{
      if(!isAuthenticated || user.role !== "Super Admin"){
        navigateTo('/')
      }
    },[])
 
  return (
   <>
   {loading ? (<Spinner/>) :(
     <div className="p-4 lg:px-36 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Good Morning,{user?.userName}</h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-2xl font-semibold text-gray-800'>Monthly Total Payments Received</h3>
        <PaymentGraph/>
      </div>
      <div className='mt-6'>
        <h3 className='text-2xl font-semibold text-gray-800'>All User</h3>
        <UserGraph/>
      </div>
      <div className='mt-6'>
        <h3 className='text-2xl font-semibold text-gray-800'>Payment Graph</h3>
        <PaymentProof/>
      </div>
      <div className='mt-6'>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Auctions</h2>
        <AuctionItemDelete/>
      </div>
    </div>
   )}
   </>
  )
}

export default Dashboard;