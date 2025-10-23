const config = {
    // Use environment variable for production, localhost for development
    API_URL: process.env.REACT_APP_API_URL || 
             (process.env.NODE_ENV === 'production' 
                ? 'https://foodcart-9zme.vercel.app/'  // Updated backend URL
                : 'http://localhost:5000')
};

// Ensure no trailing slash
if (config.API_URL.endsWith('/')) {
    config.API_URL = config.API_URL.slice(0, -1);
}

console.log('API_URL configured as:', config.API_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

export default config; 