const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. Task Schema & Model
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: 'Pending' }, 
  category: { type: String, default: "General" },
  userId: { type: String, required: true },    
  createdAt: { type: Date, default: Date.now }
});


const Task = mongoose.model('Task', TaskSchema);
const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  college: String,
  email: String,
  bio: String, // This is the "description about himself"
  updatedAt: { type: Date, default: Date.now }
});
const Profile = mongoose.model('Profile', ProfileSchema);
const INITIAL_TASKS = [
  { _id: "sys1", title: "Review Project Docs", description: "Read through the architecture overview and API documentation.", category: "Research", userId: "SYSTEM", status: "Pending" },
  { _id: "sys2", title: "Database Cleanup", description: "Optimize indexes and remove expired logs from the staging server.", category: "Coding", userId: "SYSTEM", status: "Pending" },
  { _id: "sys3", title: "Team Sync", description: "Weekly standup to discuss blockers and sprint progress.", category: "Meeting", userId: "SYSTEM", status: "Pending" },
  { _id: "sys4", title: "Design UI", description: "Update the Figma components for the new dark mode dashboard.", category: "Design", userId: "SYSTEM", status: "Pending" },
  { _id: "sys5", title: "Budgeting", description: "Review cloud infrastructure costs and adjust monthly projections.", category: "Finances", userId: "SYSTEM", status: "Pending" },
  { _id: "sys6", title: "Yoga", description: "A 30-minute full-body stretch session for mental clarity.", category: "Health", userId: "SYSTEM", status: "Pending" }
];
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, userId, category } = req.body;
    const newTask = new Task({
      title,
      description,
      userId,
      status: 'Pending'
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/tasks/:userId', async (req, res) => {
  try {
    const userTasks = await Task.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json([...INITIAL_TASKS, ...userTasks]);
  } catch (err) { res.status(500).json({ error: "Fetch failed" }); }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Toggle logic
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, userId, category } = req.body; // <--- Extract category
    const newTask = new Task({
      title,
      description,
      userId,
      category: category || 'General', // <--- Save category
      status: 'Pending'
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/profile/:userId', async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.json({}); 
    res.json(profile);
  } catch (err) { res.status(500).json({ error: "Profile fetch failed" }); }
});

app.post('/profile', async (req, res) => {
  try {
    const { userId, name, phone, college, email, bio } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { name, phone, college, email, bio, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(profile);
  } catch (err) { res.status(500).json({ error: "Profile save failed" }); }
});

app.listen(5000, () => {
  console.log(` Server running on http://localhost:5000`);
});