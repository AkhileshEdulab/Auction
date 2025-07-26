import React, { useEffect } from 'react'
import { FaDollarSign, FaShoppingBag, FaUsers, FaWallet } from 'react-icons/fa';
import PaymentProof from './Subcomponents/PaymentProof';
import UserGraph from './Subcomponents/UserGraph';
import AuctionItemDelete from './Subcomponents/AuctionItemDelete';
import PaymentGraph from './Subcomponents/PaymentGraph';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/SubComponents/Spinner';
import { clearAllSuperAdminErrors, fetchAllUser, getAllPaymentProof, monthlyRevenue } from '../../Stores/Slices/superAdminSlice';

const Dashboard = () => {
    const {loading} = useSelector(state=>state.superAdmin);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(monthlyRevenue())
        dispatch(getAllPaymentProof())
        dispatch(fetchAllUser())
        dispatch(clearAllSuperAdminErrors())
    },[])
  return (
   <>
   {loading ? (<Spinner/>) :(
     <div className="p-6 px-36 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Good Morning, Anna!</h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value="01 Jan, 2025 to 31 Jan, 2025"
            readOnly
            className="border px-3 py-2 rounded-md text-sm text-gray-600"
          />
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200">
            + Add Product
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Earnings */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">TOTAL EARNINGS</p>
              <h2 className="text-xl font-bold text-gray-800">$559.25k</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View net earnings</a>
            </div>
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <FaDollarSign />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ +16.24%</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">ORDERS</p>
              <h2 className="text-xl font-bold text-gray-800">36,894</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View all orders</a>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <FaShoppingBag />
            </div>
          </div>
          <p className="text-sm text-red-500 mt-2">↓ -3.57%</p>
        </div>

        {/* Customers */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">CUSTOMERS</p>
              <h2 className="text-xl font-bold text-gray-800">183.35M</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">See details</a>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
              <FaUsers />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ +29.08%</p>
        </div>

        {/* My Balance */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">MY BALANCE</p>
              <h2 className="text-xl font-bold text-gray-800">$165.89k</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">Withdraw money</a>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <FaWallet />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">+0.00%</p>
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
        <h3 className='text-2xl font-semibold text-gray-800'>Delete Auction Item</h3>
        <AuctionItemDelete/>
      </div>
    </div>
   )}
   </>
  )
}

export default Dashboard;