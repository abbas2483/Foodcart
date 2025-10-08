require("dotenv").config();
const mongoose = require("mongoose");

async function connectMongoDB() {
    try {
        // Check if required environment variables are provided
        if (!process.env.MongoDBConnectionURL) {
            console.error('MongoDBConnectionURL environment variable is not set');
            console.log('Please set MongoDBConnectionURL in Vercel environment variables');
            return false;
        }
        
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET environment variable is not set');
            console.log('Please set JWT_SECRET in Vercel environment variables');
            return false;
        }

        await mongoose.connect(process.env.MongoDBConnectionURL);
        console.log("Mongo DB Connected Successfully");

        const fetchedData = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
        console.log("before");
        
        global.foodItems = fetchedData;
        global.foodcategory = foodCategory;
        console.log("after");
        
        return true;
    } catch (error) {
        console.error('Mongo DB Connection Error', error);
        
        // Provide helpful error messages based on error type
        if (error.name === 'MongooseServerSelectionError') {
            console.log('\n=== MONGODB ATLAS CONNECTION HELP ===');
            console.log('1. Check if your IP address is whitelisted in MongoDB Atlas:');
            console.log('   - Go to MongoDB Atlas Dashboard');
            console.log('   - Navigate to Network Access');
            console.log('   - Add your current IP address or use 0.0.0.0/0 for all IPs');
            console.log('2. Verify your connection string in the .env file');
            console.log('3. Check if your database credentials are correct');
        }
        
        // Don't throw error, just return false so the app can continue
        return false;
    }
}

module.exports = connectMongoDB;