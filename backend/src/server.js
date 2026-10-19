import 'dotenv/config'; // Load environment variables from .env.
import express from 'express'; // Import Express web framework.
import cors from 'cors'; // Import CORS middleware for frontend communication.
import connectDB from './config/db.js'; // Import database connection function.
import authRoutes from './routes/authRoutes.js'; // Import login/register endpoints.
import taskRoutes from './routes/taskRoutes.js'; // Import task CRUD endpoints.
import uploadRoutes from './routes/uploadRoutes.js'; // Import image upload endpoint.

const app = express(); // Create the Express application.
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); // Permit the configured React origin.
app.use(express.json()); // Parse JSON request bodies into req.body.
app.use('/uploads', express.static('uploads')); // Make uploaded files accessible by URL.
app.get('/', (_req, res) => res.json({ message: 'Week 3 API is running' })); // Basic health-check endpoint.
app.use('/api/auth', authRoutes); // Mount authentication routes.
app.use('/api/tasks', taskRoutes); // Mount protected task routes.
app.use('/api/upload', uploadRoutes); // Mount image upload route.
app.use((err, _req, res, _next) => { // Central fallback for unexpected errors.
  console.error(err); // Log details in backend terminal.
  res.status(500).json({ message: 'Internal server error' }); // Send safe message to client.
});

const PORT = process.env.PORT || 5000; // Use .env port or 5000 by default.
connectDB().then(() => { // Connect database before listening.
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)); // Start API server.
});
