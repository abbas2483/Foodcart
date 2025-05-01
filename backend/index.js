const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
const mongoDB = require("./db")
const connectMongoDB = require('./db')
const router = express.Router()
const User = require('./models/user')
connectMongoDB()
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(express.json());
app.use('/api', require("./routes/createuser"));
app.use('/api', require("./routes/displayData"));
app.use('/api', require("./routes/orderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})