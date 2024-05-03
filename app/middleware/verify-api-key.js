// Middleware to verify API key in request headers
const verifyApiKey = async (req, res, next) => {
    // Retrieve API key from request headers
    const apiKey = req.headers['x-auth-token'];
    // Check if the API key matches the expected value
    if (apiKey == process.env.API_KEY) {
      // If matched, proceed to the next middleware or route handler
      next();
    } else {
      // If not matched, send a 401 Unauthorized response
      res.status(401).send("API key not verified");
    }
  }
  
  // Export the verifyApiKey middleware for use in other files
  module.exports = verifyApiKey;
  