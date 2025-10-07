require("dotenv").config();
const mongoose = require("mongoose");

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MongoDBConnectionURL);
        console.log("Mongo DB Connected Successfully");

        const fetchedData = await mongoose.connection.db.collection("Food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food-category").find({}).toArray();
                console.log("before");
                
                global.foodItems = fetchedData;
                global.foodcategory = foodCategory;
                console.log("after");
                
    } catch (error) {
        console.error('Mongo DB Connection Error', error);
        throw new Error(error);
    }
}

module.exports = connectMongoDB;