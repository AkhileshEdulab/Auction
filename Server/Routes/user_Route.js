import { fetchLeaderboard, getProfile, login, logout, register } from "../Controllers/user_Controller.js";
import express from 'express';
import { isAuthenticated } from "../Middleware/auth.js";


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getProfile);
router.get('/logout',isAuthenticated,logout);
router.get('/leaderboard',fetchLeaderboard);




export default router;