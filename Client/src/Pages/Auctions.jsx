import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Components/SubComponents/Card'
import Spinner from '../Components/SubComponents/Spinner'
const Auctions = () => {
    const {allAuction,loading}= useSelector((state)=>state.auction);  
   
      
  return (
    <div>
        {
       loading ? (<Spinner/>):(
      <section>
      <div className="my-5 px-16">
        <h1 className="text-2xl font-semibold "> Auctions</h1>
        <div className="flex flex-wrap gap-5">
          {allAuction.slice(0, 6).map((element) => (
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
            )
        }
    </div>
  )
}

export default Auctions;