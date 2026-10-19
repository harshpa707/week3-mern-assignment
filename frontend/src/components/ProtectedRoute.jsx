import { Navigate } from 'react-router-dom'; // Import redirect component.
import { useAuth } from '../context/AuthContext'; // Read authentication state.

export default function ProtectedRoute({ children }) { // Wrap pages that require login.
  const { user } = useAuth(); // Get current user from context.
  return user ? children : <Navigate to="/login" replace />; // Redirect guests to login.
}
