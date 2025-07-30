// import cron from 'node-cron'
// import { Auction } from '../Models/auctionSchema.js';
// import { calculateCommission } from '../Controllers/commissionController.js';
// import { Bid } from '../Models/bidSchema.js';
// import userModel from '../Models/user_Model.js';
// import { sendEmail } from '../Utils/sendEmail.js';

// export const endedAuctionCron = () => {
//     cron.schedule("*/1 * * * * ", async () => {
//         const now = new Date();
//         console.log("Cron endedAuction is running now...");
//         console.log("Current time:", now);

//         const endedAuction = await Auction.find({
//             endTime: { $lt: now },
//             commissionCalculated: false,
//         });
//        console.log("Found ended auctions:", endedAuction.length);

//         for (const auction of endedAuction) {
//             console.log("Processing auction:", auction.title);
//             try {
//                 const commissionAmount = await calculateCommission(auction._id);
//                 console.log("Commission calculated:", commissionAmount);
//                 auction.commissionCalculated = true;

//                 const highestBidder = await Bid.findOne({
//                     auctionItem: auction._id,
//                     amount: auction.currentBid,
//                 })
//                 console.log("Highest bidder:", highestBidder?.bidder?.id);

//                 const auctioneer = await userModel.findById(auction.createdBy);
//                 auctioneer.unpaidCommission = commissionAmount;
//                 if (highestBidder) {
//                     auction.highestBidder = highestBidder.bidder.id;
//                     await auction.save();
//                     const bidder = await userModel.findById(highestBidder.bidder.id);

//                     await userModel.findByIdAndUpdate(bidder._id, {
//                         $inc: {
//                             moneySpent:(highestBidder.amount),
//                             auctionWon: 1,
//                         },

//                     }, { new: true })
//                     await userModel.findByIdAndUpdate(auctioneer._id, {
//                         $inc: {
//                             unpaidCommission: commissionAmount,
//                         },
//                     }, { new: true });

//                     const subject = `Congratulation! You won the auction for ${auction.title}`;
//                     const message = `Dear ${bidder.userName}, \n\nCongratulation You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer
//                         email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n-Account Name:${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}
//                         \n- Bank:${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Raserpaise**:\n- You can send payment via Raserpaisa:${auctioneer.paymentMethods.easyPaisa.easyPaisaAccountNumber}\n\n3
//                         **PayPal**:\n- Send payment to: ${auctioneer.paymentMethods.payPal.paypalEmail}\n\n4. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before
//                         delivery.\n- To pay 20% upfron,use any of above methods.\n- The remaining 80% will be paid upon delivery-\n- If you wont see this condition of your auction item then send your email
//                         on this:${auctioneer.email}\n\nPlease ensure your payment is completedd by [Payment Due Date]. Once 
//                         we confirm the payment , the item will be shipped to you.\n\nThank you for participating!\n\nBest
//                         regards,\n Edulab Auction Team`;

//                        console.log("Sending email to highest bidder:", bidder.email);
//                        await sendEmail({ email: bidder.email, subject, message });
//                        console.log("✅ Email successfully sent to highest bidder");
//                 }else{
//                     await auction.save();
//                 }       
//             } catch (error) {
//                 return console.error(error||"Some error in ended auction cron . ")
//             }
//         }
//     })
// }





import cron from 'node-cron';
import { Auction } from '../Models/auctionSchema.js';
import { calculateCommission } from '../Controllers/commissionController.js';
import { Bid } from '../Models/bidSchema.js';
import userModel from '../Models/user_Model.js';
import { sendEmail } from '../Utils/sendEmail.js';

export const endedAuctionCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        const now = new Date();
        console.log("Cron endedAuction is running now...");
        console.log("Current time:", now);

        const endedAuction = await Auction.find({
            endTime: { $lt: now },
            commissionCalculated: false,
        });
        console.log("Found ended auctions:", endedAuction.length);

        for (const auction of endedAuction) {
            console.log("Processing auction:", auction.title);
            console.log("Found ended auctions:", endedAuction.map(a => a.title));

            try {
                const commissionAmount = await calculateCommission(auction._id);
                console.log("Commission calculated:", commissionAmount);
                auction.commissionCalculated = true;

                const highestBidder = await Bid.findOne({
                    auctionItem: auction._id,
                    amount: auction.currentBid,
                });

                console.log("Highest bidder:", highestBidder?.bidder?.id);

                const auctioneer = await userModel.findById(auction.createdBy);
                auctioneer.unpaidCommission = commissionAmount;

                if (highestBidder) {
                    auction.highestBidder = highestBidder.bidder.id;
                    await auction.save();

                    const bidder = await userModel.findById(highestBidder.bidder.id);

                    // ✅ Fix starts here
                    if (typeof bidder.auctionWon !== 'number') {
                        bidder.auctionWon = 0;
                    }

                    if (typeof bidder.moneySpent !== 'number') {
                        bidder.moneySpent = 0;
                    }

                    bidder.auctionWon += 1;
                    bidder.moneySpent += highestBidder.amount;
                    await bidder.save();
                    // ✅ Fix ends here

                    await userModel.findByIdAndUpdate(auctioneer._id, {
                        $inc: {
                            unpaidCommission: commissionAmount,
                        },
                    }, { new: true });

                    const subject = `Congratulation! You won the auction for ${auction.title}`;
                    const message = `Dear ${bidder.userName},\n\nCongratulation! You have won the auction for ${auction.title}.\n\nBefore proceeding with payment, please contact your auctioneer:\n\nEmail: ${auctioneer.email}\n\nPayment Methods:\n\n1. **Bank Transfer**\n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName}\n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}\n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Raserpaise**\n- Account: ${auctioneer.paymentMethods.easyPaisa.easyPaisaAccountNumber}\n\n3. **PayPal**\n- Email: ${auctioneer.paymentMethods.payPal.paypalEmail}\n\n4. **Cash on Delivery (COD)**\n- 20% upfront payment required via any method above\n- 80% due upon delivery\n\nFor questions, contact your auctioneer: ${auctioneer.email}\n\nPlease complete your payment by [Payment Due Date]. Once we confirm the payment, the item will be shipped.\n\nThank you for participating!\n\nBest regards,\nEdulab Auction Team`;

                    console.log("Sending email to highest bidder:", bidder.email);
                    await sendEmail({ email: bidder.email, subject, message });
                    console.log("✅ Email successfully sent to highest bidder");
                } else {
                    await auction.save();
                }
            } catch (error) {
                console.error(error || "Some error in ended auction cron.");
            }
        }
    });
};
