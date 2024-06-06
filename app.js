// app.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tubes-SA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema and Model
const meetingSchema = new mongoose.Schema({
  id: Number,
  topic: String,
  company: String,
  availability: [
    { day: String, time: String }
  ],
  participants: [String]
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// Example route to fetch clients
app.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
