import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentAttendance() {
  const [usn, setUsn] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setUsn(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setAttendanceData([]);
  //   setErrorMessage('');
    
  //   if (!usn) {
  //     setErrorMessage('Please enter a valid USN.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:8000/attendance', { usn });
  //     if (response.data.success) {
  //       setAttendanceData(response.data.data);
  //     } else {
  //       setErrorMessage('No attendance records found for this USN.');
  //     }
  //   } catch (err) {
  //     setErrorMessage('Error fetching attendance data.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttendanceData([]);
    setErrorMessage('');
    
    if (!usn) {
      setErrorMessage('Please enter a valid USN.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/attendance', { usn });
      console.log('Attendance Response:', response.data);  // Debugging log
      
      if (response.data.success) {
        setAttendanceData(response.data.data);
      } else {
        setErrorMessage('No attendance records found for this USN.');
      }
    } catch (err) {
      setErrorMessage('Error fetching attendance data.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Attendance</h1>
      
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usn" className="form-label">Enter USN</label>
            <input
              type="text"
              className="form-control"
              id="usn"
              value={usn}
              onChange={handleInputChange}
              placeholder="e.g., 4ni22cs027"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>

      {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

      {attendanceData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center mb-3">Attendance Records</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentAttendance;
