import { createContext, useContext, useState } from 'react'; // Import React context and state tools.
import api from '../api'; // Import configured API client.

const AuthContext = createContext(null); // Create context for login state.
export function AuthProvider({ children }) { // Make auth values available to child components.
  const [user, setUser] = useState(() => { // Restore a saved user when page refreshes.
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; } // Safely parse stored data.
  });
  async function login(email, password) { // Send login form data to backend.
    const response = await api.post('/auth/login', { email, password }); // Request login.
    localStorage.setItem('token', response.data.token); // Save JWT for subsequent requests.
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Save safe user details.
    setUser(response.data.user); // Update React auth state.
  }
  async function register(name, email, password) { // Send registration form data.
    const response = await api.post('/auth/register', { name, email, password }); // Create user.
    localStorage.setItem('token', response.data.token); // Save returned JWT.
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Save returned user profile.
    setUser(response.data.user); // Log user in immediately after registration.
  }
  function logout() { // Clear local login state.
    localStorage.removeItem('token'); // Remove authentication token.
    localStorage.removeItem('user'); // Remove saved profile.
    setUser(null); // Update app state to logged out.
  }
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>; // Share auth functions/state.
}
export function useAuth() { return useContext(AuthContext); } // Convenient hook for reading auth context.
