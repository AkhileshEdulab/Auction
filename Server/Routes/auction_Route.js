
import express from 'express';
import { isAuthenticated, isAuthorized } from '../Middleware/auth.js';
import { addAuctionItem, getAllItems, getItemDetail, getMyAuction, removeAuctionItem, republishAuctionItem } from '../Controllers/auctionItemController.js';
import { trackCommissionStatus } from '../Middleware/trackComssion.js';

const router = express.Router();

router.post('/create',isAuthenticated,isAuthorized('Auctioneer'),trackCommissionStatus,addAuctionItem);
router.get('/getAll',getAllItems);
router.get('/myitems',isAuthenticated,isAuthorized("Auctioneer"),getMyAuction);
router.get('/auction/:id',isAuthenticated,getItemDetail);
router.delete('/item/delete/:id',isAuthenticated,isAuthorized("Auctioneer"),removeAuctionItem);
router.put('/republish/item/:id',isAuthenticated,isAuthorized("Auctioneer"),republishAuctionItem);

export default router;