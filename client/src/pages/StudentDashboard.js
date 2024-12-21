import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const StudentDashboard = () => {
  const [studentProfile, setStudentProfile] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const studentUSN = "4ni22cs027";
  const studentSemester = 5;

  const csvFiles = [
    "/Attendance/Attendance_20-12-2024.csv",
    "/Attendance/Attendance_21-12-2024.csv",
    "/Attendance/Attendance_19-12-2024.csv",
  ];

  const fetchCsvData = (filePath) => {
    const simulatedData = {
      "/Attendance/Attendance_20-12-2024.csv": [
        { usn: "4ni22cs027", date: "2024-12-20" },
        { usn: "4ni22cs028", date: "2024-12-20" },
      ],
      "/Attendance/Attendance_21-12-2024.csv": [
        { usn: "4ni22cs027", date: "2024-12-21" },
        { usn: "4ni22cs029", date: "2024-12-21" },
      ],
      "/Attendance/Attendance_19-12-2024.csv": [
        { usn: "4ni22cs027", date: "2024-12-19" },
        { usn: "4ni22cs027", date: "2024-12-19" },
        { usn: "4ni22cs028", date: "2024-12-19" },
      ],
    };
  
    return Promise.resolve(simulatedData[filePath]);
  };
  
  const calculateAttendance = (data) => {
    const classes = {};
    const totalClasses = {};

    data.forEach(({ usn, date }) => {
      if (usn === studentUSN) {
        if (!classes[date]) {
          classes[date] = 0;
        }
        classes[date]++;
      }
      if (!totalClasses[date]) {
        totalClasses[date] = 0;
      }
      totalClasses[date]++;
    });

    return Object.keys(classes).map((date) => ({
      date,
      percentage: ((classes[date] / totalClasses[date]) * 100).toFixed(2),
    }));
  };

  const loadAttendanceData = async () => {
    try {
      const allData = [];
      for (const file of csvFiles) {
        const data = await fetchCsvData(file);
        allData.push(...data);
      }

      const attendance = calculateAttendance(allData);
      setAttendanceData(attendance);

      setStudentProfile({
        name: "Ananya S",
        usn: studentUSN,
        semester: studentSemester,
      });
    } catch (error) {
      console.error("Error loading attendance data:", error);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Dashboard</h2>

      {/* Student Profile Section */}
      {studentProfile && (
        <div style={styles.profileContainer}>
          <h3 style={styles.subheading}>Profile Details</h3>
          <p style={styles.profileText}>
            <strong>Name:</strong> {studentProfile.name}
          </p>
          <p style={styles.profileText}>
            <strong>USN:</strong> {studentProfile.usn}
          </p>
          <p style={styles.profileText}>
            <strong>Semester:</strong> {studentProfile.semester}
          </p>
        </div>
      )}

      {/* Attendance Table */}
      <div style={styles.attendanceContainer}>
        <h3 style={styles.subheading}>Attendance Details</h3>
        {attendanceData.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Mathematics</th>
                <th style={styles.tableHeader}>Attendance Percentage (%)</th>
                
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, index) => (
                <tr key={index} style={styles.tableRow}>
                  {/* <td style={styles.tableCell}>{row.date}</td> */}
                  <td style={styles.tableCell}>{row.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noDataText}>No attendance data available.</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  profileContainer: {
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  subheading: {
    color: "#555",
    borderBottom: "2px solid #007bff",
    paddingBottom: "8px",
    marginBottom: "10px",
    fontSize: "18px",
  },
  profileText: {
    color: "#444",
    fontSize: "16px",
    margin: "5px 0",
  },
  attendanceContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    padding: "10px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
    color: "#333",
  },
  noDataText: {
    textAlign: "center",
    color: "#999",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default StudentDashboard;

