//actual working code for both buttons(add faces and test.py)
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { exec } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const port = 5000;

// // Enable CORS for all routes
// app.use(cors());
// app.use(bodyParser.json());

// // Define the root route (GET /)
// app.get("/", (req, res) => {
//   res.send("Welcome to the Admin Dashboard API");
// });

// // Endpoint to execute add_faces.py
// app.post("/api/execute-add-faces", (req, res) => {
//   const { studentName, usn } = req.body;
//   console.log("Received request to add student:", req.body);

//   // Ensure name and USN are provided
//   if (!studentName || !usn) {
//     return res.status(400).send({ message: "Name and USN are required." });
//   }

//   // Call the add_faces.py script with parameters (name and USN)
//   exec(`python3 add_faces.py "${studentName}" "${usn}"`, (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing add_faces.py: ${stderr}`);
//       return res.status(500).send({ message: `Error executing Python script: ${stderr}` });
//     }
//     console.log(`add_faces.py output: ${stdout}`);
//     res.status(200).send({ message: "Faces added successfully" });
//   });
// });

// // Endpoint to execute test.py
// app.post("/api/execute-test", (req, res) => {
//   exec("python3 test.py", (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing test.py: ${stderr}`);
//       return res.status(500).send("Error executing Python script");
//     }
//     console.log(`test.py output: ${stdout}`);
//     res.status(200).send({ message: "Attendance taken successfully" });
//   });
// });

// // Endpoint to serve the attendance CSV file based on the provided date
// app.get("/api/fetch-attendance/:date", (req, res) => {
//   const { date } = req.params; // Get the date parameter from the URL
//   const formattedDate = date.replace(/-/g, "/"); // Replace dashes with slashes for the filename
//   const filePath = path.join(
//     "C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance",
//     `Attendance_${formattedDate}.csv`
//   );

//   console.log(`Attempting to fetch file: ${filePath}`);

//   // Check if the file exists
//   if (fs.existsSync(filePath)) {
//     // Read the file and send it as the response
//     fs.readFile(filePath, "utf-8", (err, data) => {
//       if (err) {
//         console.error("Error reading the file:", err);
//         return res.status(500).send("Error reading the file.");
//       }
//       res.status(200).send(data); // Send the CSV file content as response
//     });
//   } else {
//     return res.status(404).send("File not found");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

//working code for fetch attendance functionality
// const express = require("express");
// const cors = require("cors"); // Import the CORS middleware
// const fs = require("fs"); // To read the file system
// const path = require("path");

// const app = express();
// const port = 5000;

// // Enable CORS for all routes
// app.use(cors()); // This will allow cross-origin requests from your frontend (React)

// // Root Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Admin Dashboard API");
// });

// // Endpoint to fetch the attendance CSV file
// app.get("/api/fetch-attendance/:date", (req, res) => {
//   const { date } = req.params; // Extract the date from the URL parameter
//   const fileName = `Attendance_${date}.csv`; // Construct the file name
//   const filePath = path.join("C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance", fileName); // Path to the file

//   // Check if the file exists
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send({ message: `File not found: ${fileName}` });
//   }

//   // Read and send the CSV file content
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ message: "Error reading the file" });
//     }

//     // Send the content of the CSV file
//     res.status(200).send(data);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

//code that promises to work for both fetching and facial recog
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { exec } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const port = 5000;

// // Enable CORS for all routes
// app.use(cors());
// app.use(bodyParser.json());

// // Root Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Admin Dashboard API");
// });

// // Endpoint to fetch the attendance data with time filtering
// app.get("/api/fetch-attendance/:date/:startTime/:endTime", (req, res) => {
//   const { date, startTime, endTime } = req.params;
//   const fileName = `Attendance_${date}.csv`;
//   const filePath = path.join(
//     "C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance",
//     fileName
//   );

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send({ message: `File not found: ${fileName}` });
//   }

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ message: "Error reading the file" });
//     }

//     const rows = data.split("\n");
//     const headers = rows[0].split(",");

//     const filteredData = rows.slice(1).filter((row) => {
//       const values = row.split(",");
//       const rowDate = values[2]?.trim(); // Date column
//       const rowTime = values[3]?.trim(); // Time column

//       if (rowDate === date && rowTime >= startTime && rowTime <= endTime) {
//         return true;
//       }
//       return false;
//     });

//     // Map the filtered rows to JSON objects
//     const finalData = filteredData.map((row) => {
//       const values = row.split(",");
//       return headers.reduce((acc, header, index) => {
//         acc[header.trim()] = values[index]?.trim();
//         return acc;
//       }, {});
//     });

//     // Send the data as a JSON response
//     res.status(200).json(finalData);
//   });
// });

// // Endpoint to execute add_faces.py
// app.post("/api/execute-add-faces", (req, res) => {
//   const { studentName, usn } = req.body;
//   console.log("Received request to add student:", req.body);

//   if (!studentName || !usn) {
//     return res.status(400).send({ message: "Name and USN are required." });
//   }

//   exec(`python3 add_faces.py "${studentName}" "${usn}"`, (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing add_faces.py: ${stderr}`);
//       return res.status(500).send({ message: `Error executing Python script: ${stderr}` });
//     }
//     console.log(`add_faces.py output: ${stdout}`);
//     res.status(200).send({ message: "Faces added successfully" });
//   });
// });

// // Endpoint to execute test.py for facial recognition
// app.post("/api/execute-test", (req, res) => {
//   exec("python3 test.py", (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing test.py: ${stderr}`);
//       return res.status(500).send("Error executing Python script");
//     }
//     console.log(`test.py output: ${stdout}`);
//     res.status(200).send({ message: "Attendance taken successfully" });
//   });
// });

// // Endpoint to fetch the attendance CSV file for a specific date
// app.get("/api/fetch-attendance/:date", (req, res) => {
//   const { date } = req.params;
//   const fileName = `Attendance_${date}.csv`;
//   const filePath = path.join(
//     "C:/Users/HP/Desktop/attendance system - knn/face_recognition_project/Attendance",
//     fileName
//   );

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send({ message: `File not found: ${fileName}` });
//   }

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ message: "Error reading the file" });
//     }

//     res.status(200).send(data);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
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
