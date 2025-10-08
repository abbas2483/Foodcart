const config = {
    // Use environment variable for production, localhost for development
    API_URL: process.env.REACT_APP_API_URL || 
             (process.env.NODE_ENV === 'production' 
                ? 'https://foodcart-be.vercel.app'  // Your deployed backend URL
                : 'http://localhost:5000')
};

export default config; 