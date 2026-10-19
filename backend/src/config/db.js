import mongoose from 'mongoose'; // Import Mongoose to connect to MongoDB.

export default async function connectDB() { // Define the database connection function.
  try { // Start a block that catches connection errors.
    const connection = await mongoose.connect(process.env.MONGODB_URI); // Connect using the URI from .env.
    console.log(`MongoDB connected: ${connection.connection.host}`); // Print the connected database host.
  } catch (error) { // Run if MongoDB connection fails.
    console.error('MongoDB connection failed:', error.message); // Display the reason for failure.
    process.exit(1); // Stop the server because the database is required.
  }
}
