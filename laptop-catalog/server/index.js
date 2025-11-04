const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB URI, fallback to local MongoDB for development
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err));

// Schema and model for students
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regno: { type: String, required: true, unique: true },
  cgpa: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// API to fetch all students
app.get('/api/viewAll', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// API to add a new student
app.post('/api/addNew', async (req, res) => {
  try {
    const { name, regno, cgpa } = req.body;
    const newStudent = new Student({ name: name.trim(), regno: regno.trim(), cgpa: Number(cgpa) });
    await newStudent.save();
    res.json({ status: 'Data Saved Successfully' });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ status: `${req.body.name} already exists` });
    } else {
      res.json({ status: err.message });
    }
  }
});

// API to delete a student by ID
app.post('/api/deleteUser', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.body.id);
    res.json({ status: 'User deleted successfully' });
  } catch (err) {
    res.json({ status: 'Error deleting user' });
  }
});

// Server listen port from environment variable or default 7000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
