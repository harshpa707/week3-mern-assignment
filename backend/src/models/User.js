import mongoose from 'mongoose'; // Import Mongoose for schema/model creation.
import bcrypt from 'bcryptjs'; // Import bcrypt to hash passwords securely.

const userSchema = new mongoose.Schema({ // Define the shape of each user document.
  name: { type: String, required: true, trim: true }, // User's name is required and trimmed.
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Email must be unique.
  password: { type: String, required: true, minlength: 8 } // Store a password hash, not plain text.
}, { timestamps: true }); // Automatically add createdAt and updatedAt.

userSchema.pre('save', async function () { // Run before a user document is saved.
  if (!this.isModified('password')) return; // Avoid hashing an unchanged password again.
  this.password = await bcrypt.hash(this.password, 10); // Hash password using 10 salt rounds.
});

userSchema.methods.comparePassword = function (candidatePassword) { // Add a method to compare login password.
  return bcrypt.compare(candidatePassword, this.password); // Resolve true when the password matches.
};

export default mongoose.model('User', userSchema); // Create and export the User model.
