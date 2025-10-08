const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const connectMongoDB = require('./db')
const router = express.Router()
const User = require('./models/user')

// Initialize MongoDB connection
connectMongoDB().then((success) => {
    if (success) {
        console.log('Database connection successful');
    } else {
        console.log('Database connection failed, but server will continue running');
    }
}).catch((error) => {
    console.log('Database connection error:', error);
});

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:3000",
    "https://foodcart-tau.vercel.app"
  ].filter(Boolean); // Remove undefined values
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})

app.use(express.json());
app.use('/api', require("./routes/createuser"));
app.use('/api', require("./routes/displayData"));
app.use('/api', require("./routes/orderData"));

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})