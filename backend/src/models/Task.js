import mongoose from 'mongoose'; // Import Mongoose.

const taskSchema = new mongoose.Schema({ // Describe a task document.
  title: { type: String, required: true, trim: true }, // Task title is mandatory.
  description: { type: String, default: '' }, // Optional task description.
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Restrict status values.
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link task to its owner.
}, { timestamps: true }); // Add createdAt and updatedAt fields.

export default mongoose.model('Task', taskSchema); // Export the Task model.
