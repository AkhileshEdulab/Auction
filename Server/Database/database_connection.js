import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "MEARN_AUCTION_PLATEFORM",
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ Database connected.");
    })
    .catch((error) => {
        console.error("❌ Error connecting to the database:", error.message);
    });
};
