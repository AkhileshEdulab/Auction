import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Components/SubComponents/Card';
import Spinner from '../Components/SubComponents/Spinner';

const Auctions = () => {
  const { allAuction, loading } = useSelector((state) => state.auction);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <div className="my-5 px-4 sm:px-6 md:px-8 lg:px-16">
            <h1 className="text-2xl font-semibold mb-4">All Auctions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {allAuction.map((element) => (
                <Card
                  key={element._id}
                  id={element._id}
                  imgSrc={element.image?.url}
                  title={element.title}
                  statingBid={element.startingBid}
                  startTime={element.startTime}
                  endTime={element.endTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Auctions;
