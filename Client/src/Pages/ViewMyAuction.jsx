
 import React, { useEffect } from 'react';
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
    if (!isAuthenticated || user?.role !== 'Auctioneer') {
      navigate('/');
    } else {
      dispatch(getMyAuction());
    }
  }, [dispatch, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Auctions</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {myAuction && myAuction.length > 0 ? (
            myAuction.map((element) => (
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
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <h3 className="text-xl">You have not posted any auction.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuction;
