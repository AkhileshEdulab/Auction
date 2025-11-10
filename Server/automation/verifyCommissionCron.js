
import cron from 'node-cron';
import { PaymentProof } from '../Models/commissionProofSchema.js';
import userModel from '../Models/user_Model.js';
import { Commission } from '../Models/commissionSchema.js';
import { sendEmail } from '../Utils/sendEmail.js';

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("✅ verifyCommissionCron is running...");

    const approvedProofs = await PaymentProof.find({ status: "Approved" });

    for (const proof of approvedProofs) {
      try {
        const user = await userModel.findById(proof.userId);

        if (!user) continue;

        const amount = Number(proof.amount) || 0;

        let updatedUser;

        if (Number(user.unpaidCommission) >= amount) {
          updatedUser = await userModel.findByIdAndUpdate(user._id, {
            $inc: { unpaidCommission: -amount }
          }, { new: true });
        } else {
          updatedUser = await userModel.findByIdAndUpdate(user._id, {
            unpaidCommission: 0
          }, { new: true });
        }

        await PaymentProof.findByIdAndUpdate(proof._id, { status: "Settled" });

        await Commission.create({
          amount,
          user: user._id,
        });

        const settlementDate = new Date().toDateString();

        const subject = `✅ Payment Verified & Commission Settled`;
        const message = `Dear ${user.userName},\n\nYour payment of ${amount} has been successfully verified and settled.\n\nUpdated unpaid commission: ${updatedUser.unpaidCommission}\nSettlement Date: ${settlementDate}\n\nThank you!\n\nEdulab Auction Team`;

        await sendEmail({ email: user.email, subject, message });

        console.log(`✔️ User ${user._id} settled commission of ${amount}`);
      } catch (err) {
        console.error(`❌ Error processing commission for user ${proof.userId}: ${err.message}`);
      }
    }
  });
};
