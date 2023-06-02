import jwt from "jsonwebtoken";

// Define a custom middleware function for authentication using JWT
function authenticateJWT(req, res, next) {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  if (authHeader === "Bearer null") {
    return next();
  }
  // Check if the authorization header is present and has the correct format
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Get the JWT token from the authorization header
    const token = authHeader.slice(7);
    try {
      // Verify the JWT token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Add the decoded token to the request object
      req.user = decoded;
      // Pass the request to the next middleware function
      next();
    } catch (error) {
      // If the token is invalid or expired, send an error response to the client
      res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } else {
    // If the authorization header is not present or has the wrong format, send an error response to the client
    res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Unauthorized",
    });
  }
}
export default authenticateJWT;
