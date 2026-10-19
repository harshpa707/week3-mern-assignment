import multer from 'multer'; // Import Multer to process multipart/form-data.
import path from 'path'; // Import path helpers for safe file extension checks.
import fs from 'fs'; // Import filesystem helpers to create uploads folder.

const uploadDirectory = path.resolve('uploads'); // Choose backend/uploads as the storage folder.
if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory, { recursive: true }); // Create folder when missing.

const storage = multer.diskStorage({ // Configure files to be saved to disk.
  destination: (_req, _file, callback) => callback(null, uploadDirectory), // Save each file in uploads.
  filename: (_req, file, callback) => { // Generate a unique filename.
    const extension = path.extname(file.originalname).toLowerCase(); // Keep the original extension.
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`); // Avoid simple name collisions.
  }
});

function fileFilter(_req, file, callback) { // Accept only common image formats.
  if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype)) return callback(new Error('Only JPG, PNG, GIF or WEBP images are allowed')); // Reject other types.
  callback(null, true); // Accept supported image.
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit uploads to 5 MB.
export default upload; // Export configured middleware.
