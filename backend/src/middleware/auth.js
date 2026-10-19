import jwt from 'jsonwebtoken'; // Import JWT tools.
import User from '../models/User.js'; // Import User model to confirm token owner exists.

export default async function protect(req, res, next) { // Middleware for private routes.
  try { // Handle missing/invalid tokens safely.
    const header = req.headers.authorization; // Read Authorization header from request.
    if (!header || !header.startsWith('Bearer ')) { // Ensure Bearer token is present.
      return res.status(401).json({ message: 'Authentication token required' }); // Reject unauthenticated request.
    }
    const token = header.split(' ')[1]; // Get token text after the word Bearer.
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify signature and expiration.
    const user = await User.findById(decoded.userId).select('-password'); // Find user without password hash.
    if (!user) return res.status(401).json({ message: 'User no longer exists' }); // Reject deleted user.
    req.user = user; // Attach logged-in user to request for controllers.
    next(); // Continue to the requested route.
  } catch (error) { // Handle expired or invalid tokens.
    return res.status(401).json({ message: 'Invalid or expired token' }); // Send safe error response.
  }
}
