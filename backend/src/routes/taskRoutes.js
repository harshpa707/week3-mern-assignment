import { Router } from 'express'; // Import Express Router.
import protect from '../middleware/auth.js'; // Protect all task endpoints.
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/taskController.js'; // Import CRUD controllers.

const router = Router(); // Create task router.
router.use(protect); // Require login for every route below.
router.route('/').get(getTasks).post(createTask); // GET list and POST create.
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask); // Single-task read, update and delete.
export default router; // Export router.
