const config = {
    // Use environment variable for production, localhost for development
    API_URL: process.env.REACT_APP_API_URL || 
             (process.env.NODE_ENV === 'production' 
                ? 'https://foodcart-be.vercel.app'  // Your deployed backend URL
                : 'http://localhost:5000')
};

// Ensure no trailing slash
if (config.API_URL.endsWith('/')) {
    config.API_URL = config.API_URL.slice(0, -1);
}

export default config; 