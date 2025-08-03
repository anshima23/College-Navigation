import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    post: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    desc: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);


const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
