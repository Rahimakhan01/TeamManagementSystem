import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import Member from '../models/Member.js';

const router = express.Router();

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up multer for file uploads
const uploadsDir = path.join(dirname(__dirname), '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter for multer
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const ext = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  
  if (ext && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST add new member
router.post('/', upload.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Profile photo is required' });
    }

    const memberData = {
      name: req.body.name,
      rollNo: req.body.rollNo,
      year: req.body.year,
      degree: req.body.degree,
      aboutProject: req.body.aboutProject,
      hobbies: req.body.hobbies || '',
      certificate: req.body.certificate || '',
      internship: req.body.internship || '',
      aboutAim: req.body.aboutAim || '',
      profilePhoto: req.file.filename
    };

    // Validate required fields
    const requiredFields = ['name', 'rollNo', 'year', 'degree', 'aboutProject'];
    for (const field of requiredFields) {
      if (!memberData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Check if member with roll number already exists
    const existingMember = await Member.findOne({ rollNo: memberData.rollNo });
    if (existingMember) {
      // Delete uploaded file if member already exists
      fs.unlinkSync(path.join(uploadsDir, req.file.filename));
      return res.status(400).json({ message: 'A member with this roll number already exists' });
    }

    const newMember = new Member(memberData);
    await newMember.save();

    res.status(201).json({
      message: 'Member added successfully',
      member: newMember
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(path.join(uploadsDir, req.file.filename));
    }
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;