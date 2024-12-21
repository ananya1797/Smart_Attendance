// // import React, { useState } from "react";

// // // Utility to parse CSV data into a JavaScript object
// // const parseCSV = (csvText) => {
// //   const rows = csvText.split("\n");
// //   const headers = rows[0].split(",");
// //   return rows.slice(1).map((row) => {
// //     const values = row.split(",");
// //     return headers.reduce((acc, header, index) => {
// //       acc[header.trim()] = values[index]?.trim();
// //       return acc;
// //     }, {});
// //   });
// // };

// // const Reports = (props) => {
// //   const [date, setDate] = useState(""); // State to hold the selected date
// //   const [tableData, setTableData] = useState([]); // State to hold parsed table data
// //   const [error, setError] = useState(""); // State to hold errors

// //   // Function to fetch and parse the CSV file
// //   const fetchCSVFile = async () => {
// //     try {
// //       setError(""); // Clear previous errors

// //       if (!date) {
// //         setError("Please enter a valid date.");
// //         return;
// //       }

// //       // Format the date as 'dd-mm-yyyy' (replace slashes with dashes)
// //       const formattedDate = date.replace(/\//g, "-");

// //       // Modify the URL to include the backend server's port (5000)
// //       const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}`;
// //       console.log("Fetching from:", filePath);

// //       const fileResponse = await fetch(filePath);

// //       if (!fileResponse.ok) {
// //         throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
// //       }

// //       const fileText = await fileResponse.text();
// //       console.log("CSV Content Retrieved:", fileText);

// //       const parsedData = parseCSV(fileText);
// //       console.log("Parsed Data:", parsedData);

// //       setTableData(parsedData);
// //     } catch (error) {
// //       console.error("Error fetching or parsing the file:", error);
// //       setError(error.message || "An unexpected error occurred.");
// //       setTableData([]);
// //     }
// //   };
// //   if(props.userType === 'admin'){
// //   return (
// //     <div className="container mt-5">
// //       <h2>Teacher Portal - Attendance Reports</h2>

// //       {/* Input Field for Date */}
// //       <div className="mb-3">
// //         <label htmlFor="dateInput" className="form-label">
// //           Enter Date (format: dd/mm/yyyy):
// //         </label>
// //         <input
// //           type="text"
// //           id="dateInput"
// //           className="form-control"
// //           placeholder="dd/mm/yyyy"
// //           value={date}
// //           onChange={(e) => setDate(e.target.value)}
// //         />
// //       </div>

// //       {/* Fetch Attendance Button */}
// //       <button className="btn btn-primary" onClick={fetchCSVFile}>
// //         Fetch Attendance
// //       </button>

// //       {/* Error Message */}
// //       {error && <p className="text-danger mt-3">{error}</p>}

// //       {/* Attendance Data Table */}
// //       {tableData.length > 0 && (
// //         <div className="mt-5">
// //           <h4>Attendance Data for {date}</h4>
// //           <table className="table table-bordered">
// //             <thead>
// //               <tr>
// //                 {Object.keys(tableData[0]).map((key) => (
// //                   <th key={key}>{key}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {tableData.map((row, index) => (
// //                 <tr key={index}>
// //                   {Object.values(row).map((value, idx) => (
// //                     <td key={idx}>{value}</td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );}
// //   else return <h1>Student Report Coming soon</h1>
// // };

// // export default Reports;
// // import React, { useState } from "react";

// // // Utility to parse CSV data into a JavaScript object
// // const parseCSV = (csvText) => {
// //   const rows = csvText.split("\n");
// //   const headers = rows[0].split(",");
// //   return rows.slice(1).map((row) => {
// //     const values = row.split(",");
// //     return headers.reduce((acc, header, index) => {
// //       acc[header.trim()] = values[index]?.trim();
// //       return acc;
// //     }, {});
// //   });
// // };

// // const Reports = (props) => {
// //   const [date, setDate] = useState(""); // State to hold the selected date
// //   const [startTime, setStartTime] = useState(""); // State to hold the start time
// //   const [endTime, setEndTime] = useState(""); // State to hold the end time
// //   const [tableData, setTableData] = useState([]); // State to hold parsed table data
// //   const [error, setError] = useState(""); // State to hold errors

// //   // Function to fetch and parse the CSV file
// //   const fetchCSVFile = async () => {
// //     try {
// //       setError(""); // Clear previous errors

// //       if (!date || !startTime || !endTime) {
// //         setError("Please enter valid date and time.");
// //         return;
// //       }

// //       // Format the date as 'dd-mm-yyyy' (replace slashes with dashes)
// //       const formattedDate = date.replace(/\//g, "-");

// //       // Modify the URL to include the backend server's port (5000)
// //       const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}/${startTime}/${endTime}`;
// //       console.log("Fetching from:", filePath);

// //       const fileResponse = await fetch(filePath);

// //       if (!fileResponse.ok) {
// //         throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
// //       }

// //       const fileText = await fileResponse.text();
// //       console.log("CSV Content Retrieved:", fileText);

// //       const parsedData = parseCSV(fileText);
// //       console.log("Parsed Data:", parsedData);

// //       setTableData(parsedData);
// //     } catch (error) {
// //       console.error("Error fetching or parsing the file:", error);
// //       setError(error.message || "An unexpected error occurred.");
// //       setTableData([]);
// //     }
// //   };

// //   if (props.userType === "admin") {
// //     return (
// //       <div className="container mt-5">
// //         <h2>Teacher Portal - Attendance Reports</h2>

// //         {/* Input Field for Date */}
// //         <div className="mb-3">
// //           <label htmlFor="dateInput" className="form-label">
// //             Enter Date (format: dd/mm/yyyy):
// //           </label>
// //           <input
// //             type="text"
// //             id="dateInput"
// //             className="form-control"
// //             placeholder="dd/mm/yyyy"
// //             value={date}
// //             onChange={(e) => setDate(e.target.value)}
// //           />
// //         </div>

// //         {/* Input Fields for Start and End Time */}
// //         <div className="mb-3">
// //           <label htmlFor="startTime" className="form-label">
// //             Start Time (format: hh:mm:ss):
// //           </label>
// //           <input
// //             type="text"
// //             id="startTime"
// //             className="form-control"
// //             placeholder="hh:mm:ss"
// //             value={startTime}
// //             onChange={(e) => setStartTime(e.target.value)}
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label htmlFor="endTime" className="form-label">
// //             End Time (format: hh:mm:ss):
// //           </label>
// //           <input
// //             type="text"
// //             id="endTime"
// //             className="form-control"
// //             placeholder="hh:mm:ss"
// //             value={endTime}
// //             onChange={(e) => setEndTime(e.target.value)}
// //           />
// //         </div>

// //         {/* Fetch Attendance Button */}
// //         <button className="btn btn-primary" onClick={fetchCSVFile}>
// //           Fetch Attendance
// //         </button>

// //         {/* Error Message */}
// //         {error && <p className="text-danger mt-3">{error}</p>}

// //         {/* Attendance Data Table */}
// //         {tableData.length > 0 && (
// //           <div className="mt-5">
// //             <h4>Attendance Data for {date}</h4>
// //             <table className="table table-bordered">
// //               <thead>
// //                 <tr>
// //                   {Object.keys(tableData[0]).map((key) => (
// //                     <th key={key}>{key}</th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {tableData.map((row, index) => (
// //                   <tr key={index}>
// //                     {Object.values(row).map((value, idx) => (
// //                       <td key={idx}>{value}</td>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   } else {
// //     return <h1>Student Report Coming soon</h1>;
// //   }
// // };

// // export default Reports;

// import React, { useState } from "react";

// // Utility to parse CSV data into a JavaScript object
// const parseCSV = (csvText) => {
//   const rows = csvText.split("\n");
//   const headers = rows[0].split(",");
//   return rows.slice(1).map((row) => {
//     const values = row.split(",");
//     return headers.reduce((acc, header, index) => {
//       acc[header.trim()] = values[index]?.trim();
//       return acc;
//     }, {});
//   });
// };

// const Reports = (props) => {
//   const [date, setDate] = useState(""); // State to hold the selected date
//   const [startTime, setStartTime] = useState(""); // State to hold the start time
//   const [endTime, setEndTime] = useState(""); // State to hold the end time
//   const [tableData, setTableData] = useState([]); // State to hold parsed table data
//   const [error, setError] = useState(""); // State to hold errors

//   // Function to fetch and parse the CSV file
//   const fetchCSVFile = async () => {
//     try {
//       setError(""); // Clear previous errors

//       if (!date || !startTime || !endTime) {
//         setError("Please enter a valid date and time range.");
//         return;
//       }

//       // Format the date as 'dd-mm-yyyy' (replace slashes with dashes)
//       const formattedDate = date.replace(/\//g, "-");

//       // Modify the URL to include the backend server's port (5000)
//       const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}/${startTime}/${endTime}`;
//       console.log("Fetching from:", filePath);

//       const fileResponse = await fetch(filePath);

//       if (!fileResponse.ok) {
//         throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
//       }

//       const fileText = await fileResponse.text();
//       console.log("CSV Content Retrieved:", fileText);

//       const parsedData = parseCSV(fileText);
//       console.log("Parsed Data:", parsedData);

//       setTableData(parsedData);
//     } catch (error) {
//       console.error("Error fetching or parsing the file:", error);
//       setError(error.message || "An unexpected error occurred.");
//       setTableData([]);
//     }
//   };

//   if (props.userType === 'admin') {
//     return (
//       <div className="container mt-5">
//         <h2>Teacher Portal - Attendance Reports</h2>

//         {/* Input Fields for Date and Time Range */}
//         <div className="mb-3">
//           <label htmlFor="dateInput" className="form-label">
//             Enter Date (format: dd/mm/yyyy):
//           </label>
//           <input
//             type="text"
//             id="dateInput"
//             className="form-control"
//             placeholder="dd/mm/yyyy"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="startTimeInput" className="form-label">
//             Start Time (format: hh:mm:ss):
//           </label>
//           <input
//             type="text"
//             id="startTimeInput"
//             className="form-control"
//             placeholder="hh:mm:ss"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="endTimeInput" className="form-label">
//             End Time (format: hh:mm:ss):
//           </label>
//           <input
//             type="text"
//             id="endTimeInput"
//             className="form-control"
//             placeholder="hh:mm:ss"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//           />
//         </div>

//         {/* Fetch Attendance Button */}
//         <button className="btn btn-primary" onClick={fetchCSVFile}>
//           Fetch Attendance
//         </button>

//         {/* Error Message */}
//         {error && <p className="text-danger mt-3">{error}</p>}

//         {/* Attendance Data Table */}
//         {tableData.length > 0 && (
//           <div className="mt-5">
//             <h4>Attendance Data for {date}</h4>
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   {Object.keys(tableData[0]).map((key) => (
//                     <th key={key}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row, index) => (
//                   <tr key={index}>
//                     {Object.values(row).map((value, idx) => (
//                       <td key={idx}>{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return <h1>Student Report Coming soon</h1>;
//   }
// };

// export default Reports;
// import React, { useState } from "react";

// // Utility to parse CSV data into a JavaScript object
// const parseCSV = (csvText) => {
//   const rows = csvText.split("\n");
//   const headers = rows[0].split(",");
//   return rows.slice(1).map((row) => {
//     const values = row.split(",");
//     return headers.reduce((acc, header, index) => {
//       acc[header.trim()] = values[index]?.trim();
//       return acc;
//     }, {});
//   });
// };

// const Reports = (props) => {
//   const [date, setDate] = useState(""); // State to hold the selected date
//   const [startTime, setStartTime] = useState(""); // State to hold the start time
//   const [endTime, setEndTime] = useState(""); // State to hold the end time
//   const [tableData, setTableData] = useState([]); // State to hold parsed table data
//   const [error, setError] = useState(""); // State to hold errors

//   // Function to fetch and parse the CSV file
//   const fetchCSVFile = async () => {
//     try {
//       setError(""); // Clear previous errors

//       if (!date || !startTime || !endTime) {
//         setError("Please enter a valid date and time range.");
//         return;
//       }

//       // Format the date as 'dd-mm-yyyy' (replace slashes with dashes)
//       const formattedDate = date.replace(/\//g, "-");

//       // Modify the URL to include the backend server's port (5000)
//       const filePath = `http://localhost:5000/api/fetch-attendance/${formattedDate}/${startTime}/${endTime}`;
//       console.log("Fetching from:", filePath);

//       const fileResponse = await fetch(filePath);

//       if (!fileResponse.ok) {
//         throw new Error(`File not found: ${filePath} (${fileResponse.status})`);
//       }

//       const fileText = await fileResponse.text();
//       console.log("CSV Content Retrieved:", fileText);

//       const parsedData = parseCSV(fileText);
//       console.log("Parsed Data:", parsedData);

//       setTableData(parsedData);
//     } catch (error) {
//       console.error("Error fetching or parsing the file:", error);
//       setError(error.message || "An unexpected error occurred.");
//       setTableData([]);
//     }
//   };

//   if (props.userType === 'admin') {
//     return (
//       <div className="container mt-5">
//         <h2>Teacher Portal - Attendance Reports</h2>

//         {/* Input Fields for Date and Time Range */}
//         <div className="mb-3">
//           <label htmlFor="dateInput" className="form-label">
//             Enter Date (format: dd/mm/yyyy):
//           </label>
//           <input
//             type="text"
//             id="dateInput"
//             className="form-control"
//             placeholder="dd/mm/yyyy"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="startTimeInput" className="form-label">
//             Start Time (format: hh:mm:ss):
//           </label>
//           <input
//             type="text"
//             id="startTimeInput"
//             className="form-control"
//             placeholder="hh:mm:ss"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="endTimeInput" className="form-label">
//             End Time (format: hh:mm:ss):
//           </label>
//           <input
//             type="text"
//             id="endTimeInput"
//             className="form-control"
//             placeholder="hh:mm:ss"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//           />
//         </div>

//         {/* Fetch Attendance Button */}
//         <button className="btn btn-primary" onClick={fetchCSVFile}>
//           Fetch Attendance
//         </button>

//         {/* Error Message */}
//         {error && <p className="text-danger mt-3">{error}</p>}

//         {/* Attendance Data Table */}
//         {tableData.length > 0 && (
//           <div className="mt-5">
//             <h4>Attendance Data for {date}</h4>
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   {/* Dynamically generate table headers from the keys of the first object */}
//                   {Object.keys(tableData[0]).map((key) => (
//                     <th key={key}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Dynamically render table rows */}
//                 {tableData.map((row, index) => (
//                   <tr key={index}>
//                     {/* For each row, render the values of the object */}
//                     {Object.values(row).map((value, idx) => (
//                       <td key={idx}>{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return <h1>Student Report Coming soon</h1>;
//   }
// };

// export default Reports;

import React, { useState } from "react";

const Reports = (props) => {
  const [date, setDate] = useState(""); // State to hold the selected date
  const [startTime, setStartTime] = useState(""); // State to hold the start time
  const [endTime, setEndTime] = useState(""); // State to hold the end time
  const [tableData, setTableData] = useState([]); // State to hold parsed table data
  const [error, setError] = useState(""); // State to hold errors

  // Function to fetch and parse the data
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
      const parsedData = await fileResponse.json();
      console.log("Parsed Data:", parsedData);

      setTableData(parsedData);
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
  } else {
    return <h1>Student Report Coming soon</h1>;
  }
};

export default Reports;
