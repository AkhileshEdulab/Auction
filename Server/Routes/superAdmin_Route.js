import express from 'express';
import { isAuthenticated, isAuthorized } from '../Middleware/auth.js';
import { deleteAuctionItem, deletePaymentProof, fetchAllUsers, getAllPaymentProof, getPaymentProofDetail, monthlyRevenue, updateProofStatus } from '../Controllers/superAdmin_Controller.js';

const router = express.Router();

router.delete('/auctionItem/delete/:id',isAuthenticated,isAuthorized("Super Admin"),deleteAuctionItem);
router.get('/paymentProof/getAll',isAuthenticated,isAuthorized("Super Admin"),getAllPaymentProof);
router.get('/paymentProof/:id',isAuthenticated,isAuthorized("Super Admin"),getPaymentProofDetail);
router.put('/paymentProof/status/update/:id',isAuthenticated,isAuthorized("Super Admin"),updateProofStatus);
router.delete('/paymentProof/delete/:id',isAuthenticated,isAuthorized("Super Admin"),deletePaymentProof);
router.get('/user/getAll',isAuthenticated,isAuthorized("Super Admin"),fetchAllUsers);
router.get('/monthlyincome',isAuthenticated,isAuthorized("Super Admin"),monthlyRevenue);


export default router;