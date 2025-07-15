import userModel from "../Models/user_Model.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import errorHandler from "./errorHandler.js";

export const trackCommissionStatus = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);

    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    if (user.unpaidCommission > 0) {
        return next(new errorHandler("You have unpaid commissions. Please pay your commission before posting a new auction.", 403));
    }

    next();
});
