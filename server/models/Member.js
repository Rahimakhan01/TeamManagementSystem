import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true,
    unique: true
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  aboutProject: {
    type: String,
    required: [true, 'About project is required'],
    trim: true
  },
  hobbies: {
    type: String,
    trim: true
  },
  certificate: {
    type: String,
    trim: true
  },
  internship: {
    type: String,
    trim: true
  },
  aboutAim: {
    type: String,
    trim: true
  },
  profilePhoto: {
    type: String,
    required: [true, 'Profile photo is required']
  }
}, {
  timestamps: true
});

// Create an index on rollNo for faster lookups
memberSchema.index({ rollNo: 1 });

// Create an index on name for text-based search
memberSchema.index({ name: 'text', degree: 'text' });

const Member = mongoose.model('Member', memberSchema);

export default Member;