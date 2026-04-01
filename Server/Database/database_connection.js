// import mongoose from 'mongoose';

// export const connectDB = () => {
//     mongoose.connect(process.env.MONGODB_URI, {
//         dbName: "MEARN_AUCTION_PLATEFORM",
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("✅ Database connected.");
//     })
//     .catch((error) => {
//         console.error("❌ Error connecting to the database:", error.message);
//     });
// };

import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "MEARN_AUCTION_PLATEFORM",
        family: 4 // Force IPv4 to avoid IPv6 resolution issues
    })
    .then(() => {
        console.log("✅ Database connected.");
    })
    .catch((error) => {
        console.error("❌ Error connecting to the database:", error.message);
    });
};
