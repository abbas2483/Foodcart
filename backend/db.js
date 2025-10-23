require("dotenv").config();
const mongoose = require("mongoose");

// Cache the connection to avoid multiple connections
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

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

        // If already connected, return true
        if (cached.conn) {
            console.log("Using existing MongoDB connection");
            return true;
        }

        // If connection is in progress, wait for it
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                maxPoolSize: 10,
                retryWrites: true,
                w: "majority"
            };

            cached.promise = mongoose.connect(process.env.MongoDBConnectionURL, opts).then((mongoose) => {
                console.log("Mongo DB Connected Successfully");
                return mongoose;
            });
        }

        cached.conn = await cached.promise;
        
        // Test the connection
        try {
            const fetchedData = await mongoose.connection.db.collection("Food-items").find({}).limit(1).toArray();
            const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).limit(1).toArray();
            console.log("Database test query successful - Food items:", fetchedData.length, "Categories:", foodCategory.length);
        } catch (testError) {
            console.log("Database test query failed:", testError.message);
        }
        
        return true;
    } catch (error) {
        console.error('Mongo DB Connection Error', error);
        
        // Reset the cached connection on error
        cached.conn = null;
        cached.promise = null;
        
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