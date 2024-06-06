const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/tubes-SA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const meetingSchema = new mongoose.Schema({
  id: Number,
  topic: String,
  company: String,
  date: String,
  availability: [
    { day: String, time: String }
  ],
  participants: [String]
});

const Meeting = mongoose.model('Meeting', meetingSchema);

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
