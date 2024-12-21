// //for attendance.js in student 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/attendance_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Attendance schema
const attendanceSchema = new mongoose.Schema({
  usn: String,
  date: String,
  time: String
});

// Create Attendance model and explicitly specify the collection as 'attendance'
const Attendance = mongoose.model('Attendance', attendanceSchema, 'attendance');

// Route to get attendance data based on USN
// app.post('/attendance', async (req, res) => {
//   const { usn } = req.body;
//   try {
//     const attendanceRecords = await Attendance.find({ usn: usn });
//     res.json({ success: true, data: attendanceRecords });
//   } catch (err) {
//     console.log('Error fetching attendance:', err);
//     res.status(500).json({ success: false, message: 'Error fetching attendance' });
//   }
// });

app.post('/attendance', async (req, res) => {
  const { usn } = req.body;
  try {
    // Adjust the query to fetch the data correctly, considering the possibility of dates being missed in the query
    const attendanceRecords = await Attendance.find({ usn: usn }).sort({ date: -1 }); // Sort by date in descending order
    res.json({ success: true, data: attendanceRecords });
  } catch (err) {
    console.log('Error fetching attendance:', err);
    res.status(500).json({ success: false, message: 'Error fetching attendance' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
