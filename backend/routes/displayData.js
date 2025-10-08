const express = require('express')
const router = express.Router()

router.post("/foodData", async (req, res) => {
    try{
        console.log("foodData endpoint called");
        console.log("global.foodItems:", global.foodItems);
        console.log("global.foodcategory:", global.foodcategory);
        res.send([global.foodItems,global.foodcategory]);

    } catch(error){
        console.error("foodData error:", error);
        res.send("Internal Server Error");

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