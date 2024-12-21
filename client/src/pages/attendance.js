// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import "chart.js/auto"; // Automatically register Chart.js components
// import "bootstrap/dist/css/bootstrap.min.css";

// const Attendance = (props) => {
//   const [attendanceSummary, setAttendanceSummary] = useState(null);
//   const [categorizedData, setCategorizedData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:7000/api/attendance-summary");
//         const data = await response.json();

//         setAttendanceSummary(data.attendanceSummary);
//         setCategorizedData(data.categorizedData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (!attendanceSummary || !categorizedData) return <div>No data available</div>;

//   // Prepare Bar Chart data
//   const barData = {
//     labels: attendanceSummary.map((item) => item.usn),
//     datasets: [
//       {
//         label: "Classes Attended",
//         data: attendanceSummary.map((item) => item.daysAttended),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Prepare Pie Chart data
//   const pieData = {
//     labels: ["0-75%", "75%-85%", "85%-100%"],
//     datasets: [
//       {
//         data: [
//           categorizedData.lowAttendance.length,
//           categorizedData.moderateAttendance.length,
//           categorizedData.highAttendance.length,
//         ],
//         backgroundColor: ["#f7301e", "#FFCE56", "#2cc215"],
//         hoverBackgroundColor: ["#f7301e", "#FFCE56", "#2cc215"],
//       },
//     ],
//   };

//   // Calculate attendance percentage for each student
//   const calculatePercentage = (attended, total) => {
//     return total > 0 ? ((attended / total) * 100).toFixed(2) : 0;
//   };

//   // Filter attendance based on percentage categories
//   const below75 = attendanceSummary.filter((student) => calculatePercentage(student.daysAttended, student.totalDays) <= 75);
//   const between75And85 = attendanceSummary.filter(
//     (student) => calculatePercentage(student.daysAttended, student.totalDays) > 75 && calculatePercentage(student.daysAttended, student.totalDays) <= 85
//   );
//   const above85 = attendanceSummary.filter((student) => calculatePercentage(student.daysAttended, student.totalDays) > 85);
//   if(props.userType === 'admin'){
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center" style={{textDecoration: "underline"}}>Attendance Summary</h2>

//       <div className="row">
//         {/* Bar Chart */}
//         <div className="col-md-6">
//           <h4>Classes Attended per USN</h4>
//           <Bar
//             data={barData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: "top" },
//                 title: {
//                   display: true,
//                   text: "Number of Classes Attended per USN",
//                 },
//               },
//             }}
//           />
//         </div>

//         {/* Pie Chart */}
//         <div className="col-md-6">
//           <h4>Attendance Categories</h4>
//           <Pie data={pieData} />
//         </div>
//       </div>

//       {/* Attendance Details Table */}
//       <div className="row mt-4">
//         <div className="col-md-12">
//           <h4>All Attendance Details</h4>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>USN</th>
//                 <th>Days Attended</th>
//                 <th>Total Days</th>
//                 <th>Attendance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceSummary.map((student) => {
//                 const percentage = calculatePercentage(student.daysAttended, student.totalDays);
//                 return (
//                   <tr
//                     key={student.usn}
//                     className={
//                       percentage < 75
//                         ? "table-danger"
//                         : percentage < 85
//                         ? "table-warning"
//                         : "table-success"
//                     }
//                   >
//                     <td>{student.usn}</td>
//                     <td>{student.daysAttended}</td>
//                     <td>{student.totalDays}</td>
//                     <td>{percentage}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Below 75% Attendance */}
//       <div className="row mt-4">
//         <div className="col-md-12">
//           <h4>Below 75% Attendance</h4>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>USN</th>
//                 <th>Days Attended</th>
//                 <th>Total Days</th>
//                 <th>Attendance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {below75.map((student) => {
//                 const percentage = calculatePercentage(student.daysAttended, student.totalDays);
//                 return (
//                   <tr key={student.usn}>
//                     <td>{student.usn}</td>
//                     <td>{student.daysAttended}</td>
//                     <td>{student.totalDays}</td>
//                     <td>{percentage}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* 75-85% Attendance */}
//       <div className="row mt-4">
//         <div className="col-md-12">
//           <h4>75%-85% Attendance</h4>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>USN</th>
//                 <th>Days Attended</th>
//                 <th>Total Days</th>
//                 <th>Attendance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {between75And85.map((student) => {
//                 const percentage = calculatePercentage(student.daysAttended, student.totalDays);
//                 return (
//                   <tr key={student.usn}>
//                     <td>{student.usn}</td>
//                     <td>{student.daysAttended}</td>
//                     <td>{student.totalDays}</td>
//                     <td>{percentage}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Above 85% Attendance */}
//       <div className="row mt-4">
//         <div className="col-md-12">
//           <h4>Above 85% Attendance</h4>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>USN</th>
//                 <th>Days Attended</th>
//                 <th>Total Days</th>
//                 <th>Attendance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {above85.map((student) => {
//                 const percentage = calculatePercentage(student.daysAttended, student.totalDays);
//                 return (
//                   <tr key={student.usn}>
//                     <td>{student.usn}</td>
//                     <td>{student.daysAttended}</td>
//                     <td>{student.totalDays}</td>
//                     <td>{percentage}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );}
//   else{
//     return(
//       <div>
//         <h1>Student Attendance.js coming soon</h1>
//       </div>
//     );
//   }
// };

// export default Attendance;


import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Automatically register Chart.js components
import "bootstrap/dist/css/bootstrap.min.css";
import StudentAttendance from './StudentAttendance'

const Attendance = (props) => {
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [categorizedData, setCategorizedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/attendance-summary");
        const data = await response.json();

        setAttendanceSummary(data.attendanceSummary);
        setCategorizedData(data.categorizedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!attendanceSummary || !categorizedData) return <div>No data available</div>;

  // Prepare Bar Chart data
  const barData = {
    labels: attendanceSummary.map((item) => item.usn),
    datasets: [
      {
        label: "Classes Attended",
        data: attendanceSummary.map((item) => item.daysAttended),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare Pie Chart data
  const pieData = {
    labels: ["0-75%", "75%-85%", "85%-100%"],
    datasets: [
      {
        data: [
          categorizedData.lowAttendance.length,
          categorizedData.moderateAttendance.length || 0, // Ensure zero if empty
          categorizedData.highAttendance.length,
        ],
        backgroundColor: ["#f7301e", "#FFCE56", "#2cc215"],
        hoverBackgroundColor: ["#f7301e", "#FFCE56", "#2cc215"],
      },
    ],
  };

  // Calculate attendance percentage for each student
  const calculatePercentage = (attended, total) => {
    return total > 0 ? ((attended / total) * 100).toFixed(2) : 0;
  };

  // Filter attendance based on percentage categories
  const below75 = attendanceSummary.filter((student) => calculatePercentage(student.daysAttended, student.totalDays) <= 75);
  const between75And85 = attendanceSummary.filter(
    (student) => calculatePercentage(student.daysAttended, student.totalDays) > 75 && calculatePercentage(student.daysAttended, student.totalDays) <= 85
  );
  const above85 = attendanceSummary.filter((student) => calculatePercentage(student.daysAttended, student.totalDays) > 85);

  if(props.userType === 'admin'){
    return (
      <div className="container mt-4">
        <h2 className="text-center" style={{textDecoration: "underline"}}>Attendance Summary</h2>

        <div className="row">
          {/* Bar Chart */}
          <div className="col-md-6">
            <h4>Classes Attended per USN</h4>
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Number of Classes Attended per USN",
                  },
                },
              }}
            />
          </div>

          {/* Pie Chart */}
          <div className="col-md-6">
            <h4>Attendance Categories</h4>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Attendance Details Table */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>All Attendance Details</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Days Attended</th>
                  <th>Total Days</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {attendanceSummary.map((student) => {
                  const percentage = calculatePercentage(student.daysAttended, student.totalDays);
                  return (
                    <tr
                      key={student.usn}
                      className={
                        percentage < 75
                          ? "table-danger"
                          : percentage < 85
                          ? "table-warning"
                          : "table-success"
                      }
                    >
                      <td>{student.usn}</td>
                      <td>{student.daysAttended}</td>
                      <td>{student.totalDays}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Below 75% Attendance */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>Below 75% Attendance</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Days Attended</th>
                  <th>Total Days</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {below75.map((student) => {
                  const percentage = calculatePercentage(student.daysAttended, student.totalDays);
                  return (
                    <tr key={student.usn}>
                      <td>{student.usn}</td>
                      <td>{student.daysAttended}</td>
                      <td>{student.totalDays}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 75-85% Attendance */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>75%-85% Attendance</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Days Attended</th>
                  <th>Total Days</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {between75And85.map((student) => {
                  const percentage = calculatePercentage(student.daysAttended, student.totalDays);
                  return (
                    <tr key={student.usn}>
                      <td>{student.usn}</td>
                      <td>{student.daysAttended}</td>
                      <td>{student.totalDays}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Above 85% Attendance */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>Above 85% Attendance</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Days Attended</th>
                  <th>Total Days</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {above85.map((student) => {
                  const percentage = calculatePercentage(student.daysAttended, student.totalDays);
                  return (
                    <tr key={student.usn}>
                      <td>{student.usn}</td>
                      <td>{student.daysAttended}</td>
                      <td>{student.totalDays}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <StudentAttendance/>;
  }
};

export default Attendance;
