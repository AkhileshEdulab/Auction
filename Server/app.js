import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { connectDB } from './Database/database_connection.js';
import  { errorMiddleware } from './Middleware/errorHandler.js';
import userRouter from './Routes/user_Route.js';
import auctionRouter from './Routes/auction_Route.js';
import bidRouter from './Routes/bid _Route.js';
import commissionRouter from './Routes/commission_Route.js';
import superAdminRouter from './Routes/superAdmin_Route.js';
import { endedAuctionCron } from './automation/endedAuctionCron.js';
import { verifyCommissionCron } from './automation/verifyCommissionCron.js';


const app = express();
config({
    path:"./Config/config.env",quiet:true
})

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

app.use('/api/v1/user/',userRouter);
app.use('/api/v1/auction/',auctionRouter);
app.use('/api/v1/bid/',bidRouter);
app.use('/api/v1/commission/',commissionRouter);
app.use('/api/v1/superAdmin/',superAdminRouter);





 endedAuctionCron();
 verifyCommissionCron();
connectDB();
app.use(errorMiddleware)
export default app;