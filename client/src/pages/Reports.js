import React, { useState } from "react";

const Reports = (props) => {
  const [date, setDate] = useState(""); // State to hold the selected date
  const [startTime, setStartTime] = useState(""); // State to hold the start time
  const [endTime, setEndTime] = useState(""); // State to hold the end time
  const [tableData, setTableData] = useState([]); // State to hold parsed table data
  const [error, setError] = useState(""); // State to hold errors

  // Function to fetch and parse the data
  // const fetchCSVFile = async () => {
  //   try {
  //     setError(""); // Clear previous errors

  //     if (!date || !startTime || !endTime) {
  //       setError("Please enter a valid date and time range.");
  //       return;
  //     }

  //     const formattedDate = date.replace(/\//g, "-");
  //     const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}/${startTime}/${endTime}`;

  //     const fileResponse = await fetch(filePath);

  //     if (!fileResponse.ok) {
  //       throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
  //     }

  //     // Parse the JSON response
  //     const parsedData = await fileResponse.json();
  //     console.log("Parsed Data:", parsedData);

  //     setTableData(parsedData);
  //   } catch (error) {
  //     console.error("Error fetching or parsing the file:", error);
  //     setError(error.message || "An unexpected error occurred.");
  //     setTableData([]);
  //   }
  // };
  const fetchCSVFile = async () => {
    try {
      setError(""); // Clear previous errors
  
      if (!date || !startTime || !endTime) {
        setError("Please enter a valid date and time range.");
        return;
      }
  
      const formattedDate = date.replace(/\//g, "-");
      const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}/${startTime}/${endTime}`;
  
      const fileResponse = await fetch(filePath);
  
      if (!fileResponse.ok) {
        throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
      }
  
      // Parse the JSON response
      let parsedData = await fileResponse.json();
      console.log("Parsed Data:", parsedData);
  
      // Filter data to keep only distinct rows based on USN
      const uniqueData = parsedData.filter(
        (row, index, self) =>
          index ===
          self.findIndex((r) => r["USN"] === row["USN"]) // Replace "USN" with the actual key name for USN in your data
      );
  
      setTableData(uniqueData);
    } catch (error) {
      console.error("Error fetching or parsing the file:", error);
      setError(error.message || "An unexpected error occurred.");
      setTableData([]);
    }
  };
  
  if (props.userType === "admin") {
    return (
      <div className="container mt-5">
        <h2>Teacher Portal - Attendance Reports</h2>

        {/* Input Fields for Date and Time Range */}
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">
            Enter Date (format: dd/mm/yyyy):
          </label>
          <input
            type="text"
            id="dateInput"
            className="form-control"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="startTimeInput" className="form-label">
            Start Time (format: hh:mm:ss):
          </label>
          <input
            type="text"
            id="startTimeInput"
            className="form-control"
            placeholder="hh:mm:ss"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endTimeInput" className="form-label">
            End Time (format: hh:mm:ss):
          </label>
          <input
            type="text"
            id="endTimeInput"
            className="form-control"
            placeholder="hh:mm:ss"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Fetch Attendance Button */}
        <button className="btn btn-primary" onClick={fetchCSVFile}>
          Fetch Attendance
        </button>

        {/* Error Message */}
        {error && <p className="text-danger mt-3">{error}</p>}

        {/* Attendance Data Table */}
        {tableData.length > 0 && (
          <div className="mt-5">
            <h4>Attendance Data for {date}</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* Dynamically generate table headers from the keys of the first object */}
                  {Object.keys(tableData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Dynamically render table rows */}
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {/* For each row, render the values of the object */}
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  } else if (props.userType === 'student'){
    return(
      <div>
        <p>Reports to you will be sent by you respective admin, contact your admin.</p>
      </div>
    );
  }
  else{
    return <p>Please Login to view.</p>
  }
};

export default Reports;
