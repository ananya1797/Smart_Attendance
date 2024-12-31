//for data visulaization in attendance in attendance.js in admin
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 7000;

const mongoUri = "mongodb://localhost:27017/";
const dbName = "attendance_system";

app.use(cors());

app.get("/api/attendance-summary", async (req, res) => {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db(dbName);
    const attendanceCollection = db.collection("attendance");

    // Calculate total days
    const totalDaysData = await attendanceCollection.distinct("date");
    const totalDays = totalDaysData.length;

    // Aggregate attendance data grouped by USN
    const attendanceData = await attendanceCollection.aggregate([
      {
        $group: {
          _id: "$usn",
          daysAttended: { $addToSet: "$date" }, // Avoid duplicate days
        },
      },
      {
        $project: {
          _id: 1,
          daysAttended: { $size: "$daysAttended" }, // Count unique dates attended
        },
      },
    ]).toArray();

    // Initialize categorized data arrays
    const categorizedData = {
      lowAttendance: [], // 0-75%
      moderateAttendance: [], // 75%-85%
      highAttendance: [], // 85%-100%
    };

    // Prepare attendance summary and categorize students
    const attendanceSummary = attendanceData.map((item) => {
      const percentage = ((item.daysAttended / totalDays) * 100).toFixed(2);
      const student = {
        usn: item._id,
        daysAttended: item.daysAttended,
        totalDays,
        percentage: parseFloat(percentage),
      };

      // Categorize based on percentage
      if (student.percentage <= 75) {
        categorizedData.lowAttendance.push(student); // 0-75%
      } else if (student.percentage <= 85) {
        categorizedData.moderateAttendance.push(student); // 75%-85%
      } else {
        categorizedData.highAttendance.push(student); // 85%-100%
      }

      return student;
    });

    await client.close();

    // Send response with both attendance summary and categorized data
    res.status(200).json({ attendanceSummary, categorizedData });
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).send("Error fetching attendance summary");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

