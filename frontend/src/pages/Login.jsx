import { useState } from 'react'; // Import state for form values.
import { Link, useNavigate } from 'react-router-dom'; // Import navigation helpers.
import { useAuth } from '../context/AuthContext'; // Access login function.

export default function Login() { // Login page component.
  const [email, setEmail] = useState(''); // Store email field value.
  const [password, setPassword] = useState(''); // Store password field value.
  const [error, setError] = useState(''); // Store user-friendly error.
  const { login } = useAuth(); // Get login function from context.
  const navigate = useNavigate(); // Get redirect function.
  async function handleSubmit(event) { // Handle form submission.
    event.preventDefault(); // Stop browser from reloading page.
    setError(''); // Clear old error before retrying.
    try { await login(email, password); navigate('/'); } // Log in then open task dashboard.
    catch (err) { setError(err.response?.data?.message || 'Login failed. Is the backend running?'); } // Show API error.
  }
  return <main className="auth-card"><h1>Login</h1><form onSubmit={handleSubmit}>
    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
    <button type="submit">Login</button>{error && <p className="error">{error}</p>}
  </form><p>New user? <Link to="/register">Create an account</Link></p></main>; // Render form and registration link.
}
