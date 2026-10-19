import { useEffect, useState } from 'react'; // Import state and lifecycle hooks.
import api from '../api'; // Import Axios API client.
import { useAuth } from '../context/AuthContext'; // Access logged-in user and logout.

export default function Dashboard() { // Main task dashboard.
  const { user, logout } = useAuth(); // Read authentication values.
  const [tasks, setTasks] = useState([]); // Store tasks loaded from database.
  const [title, setTitle] = useState(''); // Store new task title.
  const [description, setDescription] = useState(''); // Store new task description.
  const [filter, setFilter] = useState('all'); // Store selected task filter.
  const [error, setError] = useState(''); // Store request errors.
  const [image, setImage] = useState(null); // Store selected local image file.
  const [imageUrl, setImageUrl] = useState(''); // Store uploaded image URL.

  async function loadTasks() { // Request tasks from backend.
    try { const response = await api.get('/tasks'); setTasks(response.data); } // Save returned tasks.
    catch (err) { setError(err.response?.data?.message || 'Could not load tasks'); } // Display error.
  }
  useEffect(() => { loadTasks(); }, []); // Load task list when dashboard mounts.

  async function addTask(event) { // Create a new task.
    event.preventDefault(); // Prevent browser reload.
    if (!title.trim()) return setError('Please enter a task title'); // Frontend validation.
    try { await api.post('/tasks', { title, description }); setTitle(''); setDescription(''); setError(''); await loadTasks(); } // Save and refresh list.
    catch (err) { setError(err.response?.data?.message || 'Could not add task'); } // Show API error.
  }
  async function toggleTask(task) { // Toggle pending/completed status.
    try { await api.put(`/tasks/${task._id}`, { status: task.status === 'completed' ? 'pending' : 'completed' }); await loadTasks(); } // Update and reload.
    catch (err) { setError(err.response?.data?.message || 'Could not update task'); } // Show failure.
  }
  async function removeTask(id) { // Delete a task.
    try { await api.delete(`/tasks/${id}`); await loadTasks(); } // Delete and reload.
    catch (err) { setError(err.response?.data?.message || 'Could not delete task'); } // Show failure.
  }
  async function uploadImage(event) { // Upload selected image with Multer.
    event.preventDefault(); // Prevent browser reload.
    if (!image) return setError('Choose an image first'); // Validate file selection.
    const data = new FormData(); // Build multipart form data.
    data.append('image', image); // Field name must match upload.single('image') on backend.
    try { const response = await api.post('/upload', data); setImageUrl(`http://localhost:5000${response.data.url}`); setError(''); } // Save image URL.
    catch (err) { setError(err.response?.data?.message || 'Image upload failed'); } // Display upload error.
  }
  const visibleTasks = tasks.filter((task) => filter === 'all' || task.status === filter); // Filter tasks by selected status.

  return <main className="dashboard"><header className="topbar"><div><h1>Task Manager</h1><p>Welcome, {user?.name}</p></div><button className="secondary" onClick={logout}>Logout</button></header>
    <section className="panel"><h2>Add a task</h2><form onSubmit={addTask} className="task-form">
      <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
      <label>Description<input value={description} onChange={(e) => setDescription(e.target.value)} /></label>
      <button type="submit">Add task</button>
    </form></section>
    <section className="panel"><div className="list-heading"><h2>Your tasks</h2><label>Filter<select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All</option><option value="pending">Pending</option><option value="completed">Completed</option></select></label></div>
      {visibleTasks.length === 0 ? <p>No tasks found. Add your first task above.</p> : <ul className="task-list">{visibleTasks.map((task) => <li key={task._id} className={task.status === 'completed' ? 'completed' : ''}>
        <div><strong>{task.title}</strong><p>{task.description}</p><small>{task.status}</small></div>
        <div className="task-actions"><button className="secondary" onClick={() => toggleTask(task)}>{task.status === 'completed' ? 'Mark pending' : 'Complete'}</button><button className="danger" onClick={() => removeTask(task._id)}>Delete</button></div>
      </li>)}</ul>}
    </section>
    <section className="panel"><h2>Image upload (Multer)</h2><form onSubmit={uploadImage} className="task-form"><label>Choose image<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={(e) => setImage(e.target.files?.[0] || null)} /></label><button type="submit">Upload image</button></form>
      {imageUrl && <div className="preview"><p>Uploaded image preview:</p><img src={imageUrl} alt="Uploaded preview" /></div>}
    </section>
    {error && <p className="error" role="alert">{error}</p>}
  </main>; // Render dashboard panels.
}
