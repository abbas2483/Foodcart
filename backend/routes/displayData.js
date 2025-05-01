const express = require('express')
const router = express.Router()

router.post("/foodData", async (req, res) => {
    try{
        res.send([global.foodItems,global.foodcategory]);

    } catch(error){
        console.error(error);
        res.send("Internal Server Error");

    }
});
module.exports = router;