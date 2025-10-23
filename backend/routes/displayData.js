const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.post("/foodData", async (req, res) => {
    try{
        console.log("foodData endpoint called");
        
        // Ensure database connection
        const connectMongoDB = require('../db');
        const connected = await connectMongoDB();
        
        if (!connected) {
            console.log("Database connection failed");
            return res.status(500).json({ 
                error: "Database connection failed",
                message: "Unable to connect to database"
            });
        }
        
        console.log("Database connected, fetching data...");
        
        // Fetch data directly from database
        const foodItems = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
        
        console.log("Fetched foodItems count:", foodItems.length);
        console.log("Fetched foodCategory count:", foodCategory.length);
        
        if (foodItems.length === 0 && foodCategory.length === 0) {
            console.log("No data found in collections");
            return res.status(404).json({ 
                error: "No data found",
                message: "Food-items and Food-category collections are empty"
            });
        }
        
        res.json([foodItems, foodCategory]);

    } catch(error){
        console.error("foodData error:", error);
        res.status(500).json({ 
            error: "Internal Server Error", 
            details: error.message
        });
    }
});

// Simple test endpoint
router.get("/test", (req, res) => {
    res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

// Debug endpoint to check database connection
router.get("/debug", async (req, res) => {
    try {
        console.log("Debug endpoint called");
        console.log("MongoDB connection state:", mongoose.connection.readyState);
        
        if (mongoose.connection.readyState !== 1) {
            return res.json({
                status: "error",
                message: "Database not connected",
                connectionState: mongoose.connection.readyState
            });
        }
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Available collections:", collections);
        
        // Try to fetch data directly
        const foodItems = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
        
        res.json({
            status: "connected",
            collections: collections.map(c => c.name),
            foodItemsCount: foodItems.length,
            foodCategoryCount: foodCategory.length,
            sampleFoodItem: foodItems[0] || "No items found",
            sampleCategory: foodCategory[0] || "No categories found"
        });
    } catch (error) {
        console.error("Debug error:", error);
        res.json({
            status: "error",
            error: error.message,
            stack: error.stack
        });
    }
});
module.exports = router;