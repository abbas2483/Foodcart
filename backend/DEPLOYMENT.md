# Backend Deployment Guide

## 🔒 SECURITY FIRST
- **NEVER** put real credentials in this file
- **NEVER** commit `.env` files to git
- Use environment variables in Vercel Dashboard

## Environment Variables Required

Create these environment variables in Vercel Dashboard (Settings → Environment Variables):

1. **MongoDBConnectionURL**: Your actual MongoDB Atlas connection string
   - Get from: MongoDB Atlas → Database → Connect → Connect your application
   - Format: `mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/foodcart?retryWrites=true&w=majority`

2. **JWT_SECRET**: A random secret key for JWT tokens
   - Generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Or use any random 64+ character string

3. **FRONTEND_URL**: Your frontend Vercel URL
   - Format: `https://your-actual-frontend-domain.vercel.app`

4. **NODE_ENV**: Set to `production`

## MongoDB Atlas Setup

1. Go to MongoDB Atlas Dashboard
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (allow all IPs)
4. Get your connection string from Database > Connect

## Deployment Steps

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel Dashboard
4. Deploy
