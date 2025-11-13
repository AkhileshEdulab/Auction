import express from 'express';
import { isAuthenticated, isAuthorized } from "../Middleware/auth.js";
import { placeBid } from '../Controllers/bids_Controller.js';
import { checkAuctionEndTime } from '../Middleware/checkAuctionEndTime.js';


const router = express.Router();

router.post('/place/:id',isAuthenticated,isAuthorized('Bidder'),checkAuctionEndTime, placeBid);




export default router;