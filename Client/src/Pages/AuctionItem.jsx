// // import React, { useEffect, useState } from 'react';
// // import { FaGreaterThan } from 'react-icons/fa6';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Link, useNavigate, useParams } from 'react-router-dom';
// // import { getAuctionDetails } from '../Stores/Slices/auctionSlice';
// // import  Spinner  from '../Components/SubComponents/Spinner';
// // import { RiAuctionFill } from "react-icons/ri";

// // const AuctionItem = () => {
// //   const { id } = useParams();
// //   const { loading, auctionDetails,auctionBidder } = useSelector((state) => state.auction);
// //   const { isAuthenticated } = useSelector((state) => state.user);
// //   const navigateTo = useNavigate();
// //   const dispatch = useDispatch();

// //   const [amount, setAmount] = useState(0);
// //   const handleBid =()=>{
// //     console.log("Bids");
    
// //   }

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigateTo('/');
// //     }
// //     if (id) {
// //       dispatch(getAuctionDetails(id));
// //       console.log('Dispatching getAuctionDetails with id:', id);
// //     }
// //   }, [isAuthenticated, id, dispatch]);

// //   return (
// //     <section className="mt-4 px-20 text-2xl">
// //       <div className="flex items-center gap-2">
// //         <Link to="/" className="hover:text-red-500 text-center">Home</Link>
// //         <FaGreaterThan className="text-stone-500" />
// //         <Link to="/auctions" className="hover:text-red-500 text-center">Auction</Link>
// //         <FaGreaterThan className="text-stone-500" />
// //         <h1 className="text-stone-500 text-sm">{auctionDetails?.title}</h1>
// //       </div>

// //       {loading ? (
// //         <Spinner />
// //       ) : (
// //         <div className='flex w-full justify-between gap-5'>
// //           <div className='w-[50%]'>
// //             <div className="flex gap-5">
// //           <div className="w-full flex flex-col">
// //             <img
// //               src={auctionDetails?.image?.url}
// //               alt={auctionDetails?.title}
// //               className="w-28 h-28 object-cover overflow-hidden"
// //             />
// //           </div>
// //             <div>
// //               <h1 className="font-semibold text-[18px]">{auctionDetails?.title}</h1>
// //               <p className="font-semibold text-[18px]">
// //                 Minimum Bid:{' '}
// //                 <span className="text-red-500 text-[18px]">{auctionDetails?.startingBid}</span>
// //               </p>
// //             </div>
// //             </div>
// //             <hr className="text-stone-400 border-t-2 my-2" />
// //             <div className="description mb-4">
// //               <p className="font-semibold">Auction Descriptions</p>
// //               <ul className="list-disc ml-6 text-sm text-stone-400">
// //                 {auctionDetails?.description &&
// //                   auctionDetails.description.split('. ').map((element, index) => (
// //                     <li key={index} className='text-[18px] my-2'>{element}</li>
// //                   ))}
// //               </ul>
// //             </div>
// //           </div>
// //           <div className='w-[50%]'>
// //             <div className="bg-gray-200 rounded-md p-4 mb-4">
// //               <h2 className="font-semibold text-2xl mb-2">Top Bidders</h2>
// //               </div>
// //                   <div className="">
// //                     {auctionBidder && auctionBidder.length > 0 &&
// //               new Date(auctionDetails.startTime) < Date.now() &&
// //               new Date(auctionDetails.endTime) > new Date() ? (
// //                 auctionBidder.map((bidder, index) => {
// //                   return(
// //                     <div key={index} className="flex items-center justify-between gap-4 mb-2">
// //                     <div className="flex items-center gap-4">
// //                       <img
// //                       src={bidder?.profileImage}
// //                       alt={bidder?.userName}
// //                       className="rounded-full h-12 w-12 object-cover my-2 hidden md:block"
// //                     />
// //                       <p className='text-[18px]'>{bidder?.userName}</p>
// //                     </div>
// //                     <div>
                    
// //                       {
// //                       index === 0 ?(<p className="text-[18px] font-semibold text-green-500">1st</p>
// //                       ) : index === 1 ?(<p className="text-[18px] font-semibold text-blue-500">2nd</p>

// //                       ) : index === 2 ?(<p className="text-[18px] font-semibold text-yellow-500">3rd</p>

// //                       ) : (
// //                       <p className="text-[18px] font-semibold text-gray-500">{index + 1}</p>) }
                      
// //                     </div>
// //                   </div>
// //                   )
// //                 })
// //               ) :  Date.now() < new Date(auctionDetails.startTime) ? (
// //                 <img src="/notStarted.png" alt="notStarted.png" className='w-full max-h-[650px]'/>
// //               ):( <img src="/auctionEnded" alt="auctionEnded"  className='w-full max-h-[650px]'/>)}
            
// //                   </div>
// //             {/* Optional: Add Bid Input */}
// //             <div className='flex justify-between'>
              
// //               {
// //                 Date.now()>= new Date(auctionDetails.startTime)&&Date.now()<= new Date(auctionDetails.endTime)?(
// //                 <>
// //                 <div className="flex gap-3 flex-col sm-items-center">
// //                   <p className='text-white'>Submit Bid</p>
// //                   <input
// //                 type="number"
// //                 placeholder="Enter your bid"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 className="p-2 border rounded focus:outline-none md text-[20px]"
                
// //               />
// //               <button onClick={handleBid} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
// //                <RiAuctionFill/>
// //               </button>
// //                 </div>
// //                 </>
// //               ): new Date(auctionDetails.startTime) >Date.now()?(
// //                 <p className='text-white font-semibold text-xl'>Auction is not started yet!</p>
// //               ):(   <p className='text-white font-semibold text-xl'>Auction has ended!</p>)
// //               }
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default AuctionItem;


// import React, { useEffect, useState } from 'react';
// import { FaGreaterThan } from 'react-icons/fa6';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { getAuctionDetails } from '../Stores/Slices/auctionSlice';
// import Spinner from '../Components/SubComponents/Spinner';
// import { RiAuctionFill } from "react-icons/ri";

// const AuctionItem = () => {
// const { id } = useParams();
//   const { loading, auctionDetails, auctionBidder } = useSelector((state) => state.auction);
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();

//   const [amount, setAmount] = useState(0);

//   const handleBid = () => {
//     console.log("Bid submitted: ", amount);
//   };

//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     navigateTo('/');
//   //     return;
//   //   }
//   //   if (id) {
//   //     dispatch(getAuctionDetails(id));
//   //     console.log("Route ID param:", id);
//   //   }
//   // }, [isAuthenticated, id, dispatch]);

//   useEffect(() => {
//     if (id) {
//       console.log("Dispatching getAuctionDetails with ID:", id);
//       dispatch(getAuctionDetails(id));
//     } else {
//       console.warn("⚠️ useParams() did not return an ID");
//     }
//   }, [dispatch, id]);


//   return (
//     <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//         <Link to="/" className="hover:text-red-500">Home</Link>
//         <FaGreaterThan />
//         <Link to="/auctions" className="hover:text-red-500">Auction</Link>
//         <FaGreaterThan />
//         <span className="text-gray-500">{auctionDetails?.title}</span>
//       </div>

//       {/* Main Content */}
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Panel */}
//           <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
//             <div className="flex flex-col gap-4 items-start">
//               <img
//                 src={auctionDetails?.image?.url}
//                 alt={auctionDetails?.title}
//                 className=" rounded object-cover"
//               />
//           <h1 className="font-bold text-xl">{auctionDetails?.title}</h1>
//             </div>

//             <hr className="my-4 border-gray-300" />
//             <div>
//                 <p className="text-lg font-medium mt-2">
//                   Minimum Bid:{' '}
//                   <span className="text-red-500 font-semibold">
//                     ₹{auctionDetails?.startingBid}
//                   </span>
//                 </p>
//               </div>
//             <div>
//               <h2 className="font-bold text-lg mb-2">Auction Description</h2>
//               <ul className="list-disc ml-6 text-base text-gray-600 space-y-2">
//                 {auctionDetails?.description?.split('. ').map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
//             <div className="mb-4 bg-gray-500">
//               <h2 className="font-semibold text-2xl">Top Bidders</h2>
//             </div>

//             {/* Bidders List */}
//             <div className="space-y-2">
//               {auctionBidder && auctionBidder.length > 0 &&
//                 new Date(auctionDetails.startTime) < Date.now() &&
//                 new Date(auctionDetails.endTime) > new Date() ? (
//                 auctionBidder.map((bidder, index) => (
//                   <div key={index} className="flex justify-between items-center p-2 border rounded">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={bidder?.profileImage}
//                         alt={bidder?.userName}
//                         className="h-10 w-10 rounded-full object-cover"
//                       />
//                       <span className="text-base font-medium">{bidder?.userName}</span>
//                     </div>
//                     <span className={`font-semibold text-[18px] ${
//                       index === 0 ? 'text-green-500' :
//                       index === 1 ? 'text-blue-500' :
//                       index === 2 ? 'text-yellow-500' : 'text-gray-500'
//                     }`}>
//                       {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
//                     </span>
//                   </div>
//                 ))
//               ) : Date.now() < new Date(auctionDetails.startTime) ? (
//                 <img src="/notStarted.png" alt="Auction Not Started" className="w-full max-h-[400px] object-contain" />
//               ) : (
//                 <img src="/auctionEnded.png" alt="Auction Ended" className="w-full max-h-[400px] object-contain" />
//               )}
//             </div>

//             {/* Bid Submission */}
//             {/* <div className="mt-6">
//               {
//                auctionDetails && Date.now() >= new Date(auctionDetails.startTime) && Date.now() <= new Date(auctionDetails.endTime) ? (
//                   <div className="flex  sm:flex-row gap-3 items-center">
//                     <input
//                       type="number"
//                       placeholder="Enter your bid"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className="flex-1 p-2 border border-gray-300 rounded text-lg focus:outline-red-500"
//                     />
//                     <button
//                       onClick={handleBid}
//                       className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200"
//                     >
//                       <RiAuctionFill />
//                       Submit Bid
//                     </button>
//                   </div>
//                 ) : auctionDetails && new Date(auctionDetails.startTime) > Date.now() ? (
//                   <p className="text-yellow-600 font-semibold text-lg text-center">Auction has not started yet!</p>
//                 ) : (
//                   auctionDetails && <p className="text-red-600 font-semibold text-lg text-center">Auction has ended!</p>
//                 )
//               }
//             </div> */}

//             <div className="mt-6">
//             {now >= auctionStart && now <= auctionEnd ? (
//               <div className="flex sm:flex-row gap-3 items-center">
//                 <input
//                   type="number"
//                   placeholder="Enter your bid"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded text-lg focus:outline-red-500"
//                 />
//                 <button
//                   onClick={handleBid}
//                   className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200"
//                 >
//                   <RiAuctionFill />
//                   Submit Bid
//                 </button>
//               </div>
//             ) : now < auctionStart ? (
//               <p className="text-yellow-600 font-semibold text-lg text-center">Auction has not started yet!</p>
//             ) : (
//               <p className="text-red-600 font-semibold text-lg text-center">Auction has ended!</p>
//             )}
//           </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default AuctionItem;



import React, { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuctionDetails } from '../Stores/Slices/auctionSlice';
import Spinner from '../Components/SubComponents/Spinner';
import { RiAuctionFill } from "react-icons/ri";
import { postBid } from '../Stores/Slices/bidSlice';

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, auctionDetails, auctionBidder } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
   
    console.log("Bid submitted: ", amount);
    const formData = new FormData();
    formData.append ('amount',amount);
     dispatch(postBid(id,formData));
     dispatch(getAuctionDetails(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/');
      return;
    }

    if (id) {
      dispatch(getAuctionDetails(id));
     
    }
  }, [dispatch, id, isAuthenticated, navigateTo]);

  if (!auctionDetails || !auctionDetails.startTime || !auctionDetails.endTime) {
    return (
      <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800">
        {loading ? <Spinner /> : <p className="text-red-500">Auction not found or failed to load.</p>}
      </section>
    );
  }

  const now = Date.now();
  const auctionStart = new Date(auctionDetails.startTime);
  const auctionEnd = new Date(auctionDetails.endTime);

  return (
    <section className="px-4 sm:px-10 md:px-20 py-6 text-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <FaGreaterThan />
        <Link to="/auctions" className="hover:text-red-500">Auction</Link>
        <FaGreaterThan />
        <span className="text-gray-500">{auctionDetails.title}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
          <div className="flex p-4 flex-col gap-4 items-start">
            <img
              src={auctionDetails?.image?.url}
              alt={auctionDetails?.title}
              className="w-full h-72 rounded object-cover overflow-hidden"
            />
            <h1 className="font-bold text-xl">{auctionDetails?.title}</h1>
          </div>

          <hr className="my-4 border-gray-300" />
          <p className="text-lg font-medium mt-2">
            Category:{' '}
            <span className="text-red-500 font-semibold">
              {auctionDetails?.category}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            Condition:{' '}
            <span className="text-red-500 font-semibold">
              {auctionDetails?.condition}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            Minimum Bid:{' '}
            <span className="text-red-500 font-semibold">
              ₹{auctionDetails?.startingBid}
            </span>
          </p>

          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Auction Description</h2>
            <ul className="list-disc ml-6 text-base text-gray-600 space-y-2">
              {auctionDetails?.description?.split('. ').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
          <div className="mb-4 bg-gray-300">
            <h2 className="font-semibold text-2xl p-2">Top Bidders</h2>
          </div>

          {/* Bidders List */}
          <div className="space-y-2">
            {auctionBidder && auctionBidder.length > 0 && now > auctionStart && now < auctionEnd ? (
              auctionBidder.map((bidder, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={bidder?.profileImage}
                      alt={bidder?.userName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-base font-medium">{bidder?.userName}</span>
                  </div>
                  <span className={`font-semibold text-[18px] ${
                    index === 0 ? 'text-green-500' :
                    index === 1 ? 'text-blue-500' :
                    index === 2 ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                  </span>
                </div>
              ))
            ) : now < auctionStart ? (
              <img src="/notStarted.png" alt="Auction Not Started" className="w-full max-h-[400px] object-contain" />
            ) : (
              <img src="/auctionEnded.png" alt="Auction Ended" className="w-full max-h-[400px] object-contain" />
            )}
          </div>

          {/* Bid Submission */}
          <div className="mt-6">
            {now >= auctionStart && now <= auctionEnd ? (
              <div className="flex sm:flex-row gap-3 items-center">
                <input
                  type="number"
                  placeholder="Enter your bid"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-lg focus:outline-red-500"
                />
                <button
                  onClick={handleBid}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  <RiAuctionFill />
                 Place Bid
                </button>
              </div>
            ) : now < auctionStart ? (
              <p className="text-yellow-600 font-semibold text-lg text-center">Auction has not started yet!</p>
            ) : (
              <p className="text-red-600 font-semibold text-lg text-center">Auction has ended!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuctionItem;
