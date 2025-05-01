require("dotenv").config();
const mongoose = require("mongoose");

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MongoDBConnectionURL + process.env.DatabaseName);
        console.log("Mongo DB Connected Successfully");

        const fetchedData = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
            
                global.foodItems = fetchedData;
                global.foodcategory = foodCategory;
    } catch (error) {
        console.error('Mongo DB Connection Error', error);
        throw new Error(error);
    }
}

module.exports = connectMongoDB;