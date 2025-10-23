const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.post("/foodData", async (req, res) => {
    try{
        console.log("foodData endpoint called");
        
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            console.log("Database not connected, attempting to reconnect...");
            return res.status(500).json({ error: "Database connection failed" });
        }
        
        // Fetch data directly from database instead of using global variables
        const foodItems = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
        
        console.log("Fetched foodItems count:", foodItems.length);
        console.log("Fetched foodCategory count:", foodCategory.length);
        
        res.json([foodItems, foodCategory]);

    } catch(error){
        console.error("foodData error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Debug endpoint to check database connection
router.get("/debug", async (req, res) => {
    try {
        const mongoose = require('mongoose');
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
            error: error.message
        });
    }
});
module.exports = router;