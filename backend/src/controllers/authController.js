import jwt from 'jsonwebtoken'; // Import JWT to create login tokens.
import User from '../models/User.js'; // Import User database model.

function createToken(userId) { // Helper function for generating a JWT.
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires after one day.
}

export async function register(req, res) { // Register a new account.
  try {
    const { name, email, password } = req.body; // Read fields sent by React/Postman.
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' }); // Validate required values.
    if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters' }); // Basic password rule.
    const normalizedEmail = email.toLowerCase().trim(); // Normalize email to prevent case duplicates.
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: 'Email already registered' }); // Reject duplicate account.
    const user = await User.create({ name, email: normalizedEmail, password }); // Create user; schema hashes password.
    return res.status(201).json({ token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } }); // Return safe user and token.
  } catch (error) {
    return res.status(500).json({ message: 'Could not register user', error: error.message }); // Report unexpected server error.
  }
}

export async function login(req, res) { // Authenticate an existing account.
  try {
    const { email, password } = req.body; // Read credentials.
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' }); // Validate credentials exist.
    const user = await User.findOne({ email: email.toLowerCase().trim() }); // Find account by normalized email.
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password' }); // Avoid revealing which field failed.
    return res.json({ token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } }); // Return token and safe user data.
  } catch (error) {
    return res.status(500).json({ message: 'Could not log in', error: error.message }); // Handle unexpected error.
  }
}

export function me(req, res) { // Return the authenticated user's profile.
  return res.json({ user: req.user }); // protect middleware already removed password.
}
