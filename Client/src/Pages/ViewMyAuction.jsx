// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Spinner from '../Components/SubComponents/Spinner';
// import ViewCard from '../Components/SubComponents/ViewCard';
// import { getMyAuction } from '../Stores/Slices/auctionSlice';

// const ViewMyAuction = () => {
//   const { myAuction, loading } = useSelector(state => state.auction);
//   const { isAuthenticated, user } = useSelector(state => state.user);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isAuthenticated || user.role !== 'Auctioneer') {
//       navigate('/');
//     } else {
//       dispatch(getMyAuction());
//     }
//   }, [dispatch, isAuthenticated, user, navigate]);

//   const handleRepublish = (id) => {
//     // logic to republish auction
//     console.log('Republish auction', id);
//   };

//   const handleViewAuction = (id) => {
//     navigate(`/auction/details/${id}`);
//   };

//   const handleDeleteAuction = (id) => {
//     // logic to delete auction
//     console.log('Delete auction', id);
//   };

//   const [openDrawer,setOpenDrawer] = useState(true)
//   return (
//    <>
//     <div className="min-h-screen px-4 py-8 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Auctions</h1>

//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {myAuction?.map((element) => (
//             <div
//               key={element._id}
//               className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
//             >
//               <ViewCard
//                 id={element._id}
//                 imgSrc={element.image?.url}
//                 title={element.title}
//                 statingBid={element.startingBid}
//                 startTime={element.startTime}
//                 endTime={element.endTime}
//               />

//               <div className="mt-4 flex flex-wrap flex-col gap-2">
//                 <button
//                 //  disabled={new Date(element.endTime) > Date.now()}
//                   onClick={() => handleRepublish(element._id)}
//                   className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded"
//                 >
//                   Republish
//                 </button>
//                 <button
//                   onClick={() => handleViewAuction(element._id)}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
//                 >
//                   View Auction
//                 </button>
//                 <button
//                   onClick={() => handleDeleteAuction(element._id)}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded"
//                 >
//                   Delete Auction
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
    
//    </>
//   );
// };

// export default ViewMyAuction;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/SubComponents/Spinner';
import ViewCard from '../Components/SubComponents/ViewCard';
import { getMyAuction } from '../Stores/Slices/auctionSlice';

const ViewMyAuction = () => {
  const { myAuction, loading } = useSelector(state => state.auction);
  const { isAuthenticated, user } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (!isAuthenticated || user.role !== 'Auctioneer') {
      navigate('/');
    } else {
      dispatch(getMyAuction());
    }
  }, [dispatch, isAuthenticated, user, navigate]);


  return (
    <>
      <div className="min-h-screen px-4 py-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Auctions</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myAuction?.map((element) => (
              <div
                key={element._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <ViewCard
                  id={element._id}
                  imgSrc={element.image?.url}
                  title={element.title}
                  statingBid={element.startingBid}
                  startTime={element.startTime}
                  endTime={element.endTime}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      
    </>
  );
};

export default ViewMyAuction;


 