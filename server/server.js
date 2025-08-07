const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/cohereAiRoutes');

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB
const app = express(); // Init Express

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Middleware
app.use(cors()); // Enable Cross-Origin requests
app.use(express.json()); // Parse JSON requests
app.use('/api/auth', authRoutes); // Auth_Routes
app.use('/api/tasks', taskRoutes); // Task_Routes
app.use('/api/ai', aiRoutes); // AI_Routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));