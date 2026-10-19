import Task from '../models/Task.js'; // Import Task model for database operations.

export async function getTasks(req, res) { // Read all tasks belonging to current user.
  try {
    const filter = { owner: req.user._id }; // Never return another user's tasks.
    if (req.query.status === 'pending' || req.query.status === 'completed') filter.status = req.query.status; // Optional status filter.
    const tasks = await Task.find(filter).sort({ createdAt: -1 }); // Newest tasks appear first.
    return res.json(tasks); // Send task array to client.
  } catch (error) { return res.status(500).json({ message: 'Could not fetch tasks', error: error.message }); }
}

export async function getTask(req, res) { // Read one task by ID.
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }); // Match both ID and owner.
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Handle missing or unowned task.
    return res.json(task); // Return the matching task.
  } catch (error) { return res.status(400).json({ message: 'Invalid task ID', error: error.message }); }
}

export async function createTask(req, res) { // Create a task for the logged-in user.
  try {
    const { title, description, status } = req.body; // Read task form fields.
    if (!title || !title.trim()) return res.status(400).json({ message: 'Task title is required' }); // Validate title.
    const task = await Task.create({ title, description, status, owner: req.user._id }); // Attach owner automatically.
    return res.status(201).json(task); // Return newly created task.
  } catch (error) { return res.status(400).json({ message: 'Could not create task', error: error.message }); }
}

export async function updateTask(req, res) { // Update an existing owned task.
  try {
    const allowed = {}; // Only copy permitted fields from request.
    if (req.body.title !== undefined) allowed.title = req.body.title; // Allow title change.
    if (req.body.description !== undefined) allowed.description = req.body.description; // Allow description change.
    if (req.body.status !== undefined) allowed.status = req.body.status; // Allow status change.
    const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, allowed, { new: true, runValidators: true }); // Update and return validated result.
    if (!task) return res.status(404).json({ message: 'Task not found' }); // No matching owned task.
    return res.json(task); // Return updated task.
  } catch (error) { return res.status(400).json({ message: 'Could not update task', error: error.message }); }
}

export async function deleteTask(req, res) { // Delete one task.
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id }); // Delete only if current user owns it.
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Handle missing task.
    return res.json({ message: 'Task deleted successfully' }); // Confirm deletion.
  } catch (error) { return res.status(400).json({ message: 'Could not delete task', error: error.message }); }
}
