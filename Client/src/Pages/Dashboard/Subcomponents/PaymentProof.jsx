import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import {
  deletePaymentProof,
  getSinglePaymentProof,
  updatePaymentProof
} from '../../../Stores/Slices/superAdminSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";


const PaymentProof = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(state => state.superAdmin);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handlePaymentProofDetails = (id) => {
    dispatch(getSinglePaymentProof(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white mt-5'>
        <thead className='bg-gray-700 text-left text-white'>
          <tr className=''>
            <th className='py-2 px-4'>User ID</th>
            <th className='py-2 px-4'>Status</th>
            <th className='py-2 px-4'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {paymentProofs.length > 0 ? (
            paymentProofs.map((element, index) => {
               return (
                <tr key={index} className='border-t  text-left text-white'>
                <td className='py-2 px-4 text-blue-500'>{element.userId}</td>
                <td className='py-2 px-4'>{element.status}</td>
                <td className='py-2 px-4 space-x-2'>
                  <button
                    onClick={() => handlePaymentProofDetails(element._id)}
                    className='bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-all duration-700 '
                  >
                   <RxUpdate className='transition-all transform hover:scale-125 cursor-pointer'/>
                  </button>
                  <button
                    onClick={() => handlePaymentProofDelete(element._id)}
                    className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-700 '
                  >
                   <RiDeleteBin6Line className='transition-all transform hover:scale-125 cursor-pointer' />
                  </button>
                </td>
              </tr>
              )}
            )
          ) : (
            <tr>
              <td colSpan={3} className='py-4 text-center text-gray-500'>
                No payment proofs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
    </div>
  );
};

export default PaymentProof;


   

  export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(state => state.superAdmin);
  const [amount, setAmount] = useState(singlePaymentProof?.amount || '');
  const [status, setStatus] = useState(singlePaymentProof?.status || '');
    
  const dispatch = useDispatch();

  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || '');
      setStatus(singlePaymentProof.status || '');
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-[#00000087] bg-opacity-50 transition-all duration-300 ${
        openDrawer && singlePaymentProof?.userId ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div
        className={`w-full sm:max-w-lg bg-white rounded-t-lg sm:rounded-lg shadow-lg transform transition-all duration-300 ${
          openDrawer && singlePaymentProof?.userId
            ? 'translate-y-0'
            : 'translate-y-full sm:translate-y-0 sm:scale-95'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-xl text-center font-semibold text-red-700">Update Payment Proof</h2>
          <button
            onClick={() => setOpenDrawer(false)}
            className="text-2xl text-gray-500 hover:text-red-600 font-bold"
          >
            &times;
          </button>
        </div>
         <p className='mt-2 px-5'>You can update payment and amount.</p>
        <div className="px-5 py-4 space-y-4">
          <div className=' flex flex-col gap-1'>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              value={singlePaymentProof?.userId || ''}
              disabled
              onChange={(e)=>e.target.value}
              className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>

          <div className=' flex flex-col gap-1'>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>

          <div className=' flex flex-col gap-1'>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Sattled">Sattled</option>
            </select>
          </div>

          <div className=' flex flex-col gap-1'>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
                rows={5}
              value={singlePaymentProof?.comment || ''}
              onChange={(e)=>e.target.value}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <Link to={singlePaymentProof?.proof?.url || ""} className="bg-[#D6482B]
           flex justify-center w-full
            py-1 rounded-md text-white 
            font-semibold text-md transition-all
             duration-300 hover:bg-[#b8381e]">
               Payment Proof (SS)
          </Link>

          <div className="flex justify-end gap-3 mt-8">
           
            <button
              onClick={handlePaymentProofUpdate}
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 cursor-pointer transition-all duration-700"
            >
              {loading ? 'Updating Payment Proof...' : 'Update Payment Proof'}
            </button>

             <button
              onClick={() => setOpenDrawer(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer hover:text-white transition-all duration-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
