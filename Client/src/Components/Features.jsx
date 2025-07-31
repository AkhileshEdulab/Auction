import React from 'react';
import { useSelector } from 'react-redux';
import Card from './SubComponents/Card';

const Features = () => {
  const { loading, allAuction } = useSelector(state => state.auction);

  return (
    <section>
      <div className="my-5 px-16">
        <h1 className="text-2xl font-semibold text-gray-900">Featured Auctions</h1>
        <div className="grid flex-wrap gap-5 grid-cols-4">
          {allAuction.slice(0, 6).map((element) => (
            <Card
              key={element._id}
              imgSrc={element.image?.url}
              title={element.title}
              statingBid={element.startingBid}
              startTime={element.startTime}
              endTime={element.endTime}
              id={element._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
