// src/models/user.model.js
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Method to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcryptjs.hash(this.passwordHash, 10);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
export default User; // Export the User model as default
