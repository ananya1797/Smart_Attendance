// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line, Bar } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto"; // Auto-register Chart.js components

// const StudentDashboard = () => {
//   const [attendanceRate, setAttendanceRate] = useState([]);
//   const [attendanceTrends, setAttendanceTrends] = useState([]);
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     fetchAttendanceRate();
//     fetchAttendanceTrends("2020CS101"); // Replace with dynamic USN of logged-in student
//     fetchStudents();
//   }, []);

//   const fetchAttendanceRate = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/attendance-rate");
//       console.log("Attendance Rate Data:", response.data);
//       setAttendanceRate(response.data);
//     } catch (error) {
//       console.error("Error fetching attendance rate", error);
//     }
//   };

//   const fetchAttendanceTrends = async (usn) => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/attendance-trends/${usn}`);
//       console.log("Attendance Trends Data:", response.data);
//       setAttendanceTrends(response.data);
//     } catch (error) {
//       console.error("Error fetching attendance trends", error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/students");
//       console.log("Students Data:", response.data);
//       setStudents(response.data);
//     } catch (error) {
//       console.error("Error fetching students data", error);
//     }
//   };

//   const getStudentAttendanceRateChartData = () => {
//     return {
//       labels: attendanceRate.map((item) => item._id),
//       datasets: [
//         {
//           label: "Attendance Rate",
//           data: attendanceRate.map((item) => item.count),
//           backgroundColor: "rgba(75,192,192,0.2)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   const getAttendanceTrendsChartData = () => {
//     return {
//       labels: attendanceTrends.map((item) => item.date),
//       datasets: [
//         {
//           label: "Attendance Time",
//           data: attendanceTrends.map((item) => item.time),
//           backgroundColor: "rgba(153,102,255,0.2)",
//           borderColor: "rgba(153,102,255,1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       <div>
//         <h3>Attendance Rate</h3>
//         <Bar data={getStudentAttendanceRateChartData()} />
//       </div>
//       <div>
//         <h3>Attendance Trends</h3>
//         <Line data={getAttendanceTrendsChartData()} />
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashBoard = () => {
  const [students, setStudents] = useState([]);

  // Fetch student data
  useEffect(() => {
    axios.get('http://localhost:5001/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  // Prepare data for the chart
  const data = {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: 'USN of Students',
        data: students.map((student) => student.usn),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <Bar data={data} />
    </div>
  );
};

export default StudentDashBoard;

