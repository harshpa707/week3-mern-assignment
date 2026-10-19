import { Router } from 'express'; // Import Express Router.
import { register, login, me } from '../controllers/authController.js'; // Import authentication controllers.
import protect from '../middleware/auth.js'; // Import JWT guard.

const router = Router(); // Create a router for authentication endpoints.
router.post('/register', register); // POST /api/auth/register creates an account.
router.post('/login', login); // POST /api/auth/login returns a token.
router.get('/me', protect, me); // GET /api/auth/me requires a valid token.
export default router; // Export router to server.
