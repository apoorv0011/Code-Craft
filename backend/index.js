const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (optional - will run without it)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.warn('⚠️  MongoDB connection failed:', err.message);
    console.warn('⚠️  Server will continue running without database');
  });
} else {
  console.warn('⚠️  MONGO_URI not found in .env - running without database');
}

// Start server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Access at: http://localhost:${PORT}`);
});
