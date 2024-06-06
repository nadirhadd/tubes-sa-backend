const express = require('express');
const mongoose = require('mongoose');
const { scheduleMeetings } = require('./greedy');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/tubes-SA', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const meetingSchema = new mongoose.Schema({
    id: Number,
    topic: String,
    company: String,
    availability: [
        {day: String, time: String}
    ]
});

const Meeting = mongoose.model('Meeting', meetingSchema);

app.get('/meetings', async (req, res) => {
    try {
        const meetings = await Meeting.find();
        console.log("Raw meetings data:", meetings);
        const scheduledMeetings = scheduleMeetings(meetings);
        console.log("Scheduled meetings data:", scheduledMeetings);
        res.json(scheduledMeetings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/meetings/today', async (req, res) => {
    try {
        const meetings = await Meeting.find();
        console.log("Raw meetings data:", meetings);
        const scheduledMeetings = scheduleMeetings(meetings);
        const today = new Date().toLocaleString('en-US', { weekday: 'long' });
        const todaysMeetings = scheduledMeetings.filter(meeting => meeting.day === today);
        console.log("Today's meetings data:", todaysMeetings);
        res.json(todaysMeetings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
