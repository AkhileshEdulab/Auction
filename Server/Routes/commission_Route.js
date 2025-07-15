import express from "express";
import { isAuthenticated, isAuthorized } from "../Middleware/auth.js";
import { proofOfCommission } from "../Controllers/commissionController.js";

const router = express.Router();

router.post('/proof',isAuthenticated,isAuthorized("Auctioneer"),proofOfCommission);

export default router