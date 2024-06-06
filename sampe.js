const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tubes-SA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const meetingSchema = new mongoose.Schema({
  id: Number,
  topic: String,
  company: String,
  date: String, // Adding date field
  availability: [
    { day: String, time: String }
  ]
});

const Meeting = mongoose.model('Meeting', meetingSchema);

const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

const sampleMeetings = [
  {
    id: 1,
    topic: 'Project Kickoff',
    company: 'ABC Corp',
    date: today,
    availability: [
      { day: 'Monday', time: '10:00 AM - 11:00 AM' },
      { day: 'Wednesday', time: '02:00 PM - 03:00 PM' }
    ]
  },
  {
    id: 2,
    topic: 'Design Review',
    company: 'XYZ Inc',
    date: today,
    availability: [
      { day: 'Tuesday', time: '11:00 AM - 12:00 PM' },
      { day: 'Thursday', time: '01:00 PM - 02:00 PM' }
    ]
  }
];

Meeting.insertMany(sampleMeetings)
  .then(() => {
    console.log('Sample meetings inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting sample meetings', err);
    mongoose.connection.close();
  });
