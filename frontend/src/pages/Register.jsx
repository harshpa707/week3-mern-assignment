import { useState } from 'react'; // Import state hook.
import { Link, useNavigate } from 'react-router-dom'; // Import navigation helpers.
import { useAuth } from '../context/AuthContext'; // Access registration function.

export default function Register() { // Registration page component.
  const [name, setName] = useState(''); // Store name field.
  const [email, setEmail] = useState(''); // Store email field.
  const [password, setPassword] = useState(''); // Store password field.
  const [error, setError] = useState(''); // Store API or validation error.
  const { register } = useAuth(); // Read register function from context.
  const navigate = useNavigate(); // Redirect after successful registration.
  async function handleSubmit(event) { // Handle register form.
    event.preventDefault(); // Prevent full page reload.
    setError(''); // Clear previous error.
    try { await register(name, email, password); navigate('/'); } // Create account and open dashboard.
    catch (err) { setError(err.response?.data?.message || 'Registration failed. Is the backend running?'); } // Display failure.
  }
  return <main className="auth-card"><h1>Create account</h1><form onSubmit={handleSubmit}>
    <label>Name<input value={name} onChange={(e) => setName(e.target.value)} minLength="2" required /></label>
    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required /></label>
    <button type="submit">Register</button>{error && <p className="error">{error}</p>}
  </form><p>Already registered? <Link to="/login">Login</Link></p></main>; // Render account form.
}
