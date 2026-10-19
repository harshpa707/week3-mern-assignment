import { Router } from 'express'; // Import Express Router.
import upload from '../middleware/upload.js'; // Import configured Multer middleware.
const router = Router(); // Create upload router.
router.post('/', (req, res) => { // Handle POST /api/upload.
  upload.single('image')(req, res, (error) => { // Read one uploaded file whose form key is image.
    if (error) return res.status(400).json({ message: error.message }); // Return file type/size errors.
    if (!req.file) return res.status(400).json({ message: 'Please choose an image file' }); // Reject empty request.
    return res.status(201).json({ message: 'Image uploaded successfully', filename: req.file.filename, url: `/uploads/${req.file.filename}` }); // Return URL to display.
  });
});
export default router; // Export upload router.
