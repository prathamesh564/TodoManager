const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- SCHEMAS & MODELS ---

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: 'Pending' }, 
  category: { type: String, default: "General" },
  userId: { type: String, required: true }, 
  priority: { type: String, default: "Medium" }, 
  dueDate: { type: Date },   
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', TaskSchema);

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  college: String,
  email: String,
  bio: String, 
  updatedAt: { type: Date, default: Date.now }
});
const Profile = mongoose.model('Profile', ProfileSchema);

// --- TASK ROUTES ---

/**
 * @route   POST /tasks
 * @desc    Create a new task with title, description, and category
 */
app.post('/tasks', async (req, res) => {
  try {
    // Destructure priority and dueDate from the request body
    const { title, description, userId, category, priority, dueDate } = req.body;

    const newTask = new Task({
      title,
      description: description || "",
      userId,
      category: category || 'General',
      priority: priority || 'Medium', // Save priority from frontend
      dueDate: dueDate || null,       // Save dueDate from frontend
      status: 'Pending'
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

/**
 * @route   GET /tasks/:userId
 * @desc    Fetch all tasks for a specific user (Sorted by newest first)
 */
app.get('/tasks/:userId', async (req, res) => {
  try {
    const userTasks = await Task.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    // CLEANED: No INITIAL_TASKS added here anymore
    res.json(userTasks); 
  } catch (err) { 
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ error: "Fetch failed" }); 
  }
});

/**
 * @route   PUT /tasks/:id
 * @desc    Toggle task status between Pending and Completed
 */
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    await task.save();
    
    res.json(task);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

/**
 * @route   DELETE /tasks/:id
 * @desc    Remove a task from the database
 */
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task successfully deleted" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// --- PROFILE ROUTES ---

/**
 * @route   GET /profile/:userId
 * @desc    Fetch user profile data
 */
app.get('/profile/:userId', async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.json({}); 
    res.json(profile);
  } catch (err) { 
    res.status(500).json({ error: "Profile fetch failed" }); 
  }
});

/**
 * @route   POST /profile
 * @desc    Create or Update user profile (Upsert)
 */
app.post('/profile', async (req, res) => {
  try {
    const { userId, name, phone, college, email, bio } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { name, phone, college, email, bio, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(profile);
  } catch (err) { 
    res.status(500).json({ error: "Profile save failed" }); 
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});