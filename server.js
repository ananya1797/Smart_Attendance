//for facial recognition
//for fetching reports.js in admin
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Admin Dashboard API");
});

// Endpoint to fetch the attendance data with time filtering
app.get("/api/fetch-attendance/:date/:startTime/:endTime", (req, res) => {
  const { date, startTime, endTime } = req.params;
  const fileName = `Attendance_${date}.csv`;
  const filePath = path.join(
    "C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance",
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: `File not found: ${fileName}` });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error reading the file" });
    }

    const rows = data.split("\n");
    const headers = rows[0].split(",");

    const filteredData = rows.slice(1).filter((row) => {
      const values = row.split(",");
      const rowDate = values[2]?.trim(); // Date column
      const rowTime = values[3]?.trim(); // Time column

      if (rowDate === date && rowTime >= startTime && rowTime <= endTime) {
        return true;
      }
      return false;
    });

    // Map the filtered rows to JSON objects
    const finalData = filteredData.map((row) => {
      const values = row.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = values[index]?.trim();
        return acc;
      }, {});
    });

    // Send the data as a JSON response
    res.status(200).json(finalData);
  });
});

// Endpoint to execute add_faces.py
app.post("/api/execute-add-faces", (req, res) => {
  const { studentName, usn } = req.body;
  console.log("Received request to add student:", req.body);

  if (!studentName || !usn) {
    return res.status(400).send({ message: "Name and USN are required." });
  }

  exec(`python3 add_faces.py "${studentName}" "${usn}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing add_faces.py: ${stderr}`);
      return res.status(500).send({ message: `Error executing Python script: ${stderr}` });
    }
    console.log(`add_faces.py output: ${stdout}`);
    res.status(200).send({ message: "Faces added successfully" });
  });
});

// Endpoint to execute test.py for facial recognition
app.post("/api/execute-test", (req, res) => {
  exec("python3 test.py", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing test.py: ${stderr}`);
      return res.status(500).send("Error executing Python script");
    }
    console.log(`test.py output: ${stdout}`);
    res.status(200).send({ message: "Attendance taken successfully" });
  });
});

// Endpoint to fetch the attendance CSV file for a specific date
app.get("/api/fetch-attendance/:date", (req, res) => {
  const { date } = req.params;
  const fileName = `Attendance_${date}.csv`;
  const filePath = path.join(
    "C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance",
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: `File not found: ${fileName}` });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error reading the file" });
    }

    res.status(200).send(data);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
