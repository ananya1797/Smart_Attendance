// import StudentDashboard from './StudentDashboard';
// import {useState} from 'react';

// function Dashboard(props) {
  
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [usn, setUsn] = useState("");
  
  
//   console.log(`props is sent ${props.userType}`);

//   const runAddFaces = async () => {
//     if (!name || !usn) {
//       alert("Please fill out both fields before submitting.");
//       return;
//     }

//     console.log("Sending data:", { studentName: name, usn });

//     try {
//       const response = await fetch("http://localhost:5000/api/execute-add-faces", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ studentName: name, usn }), // Ensure proper structure
//       });

//       const data = await response.json();
//       console.log("Response from server:", data); // Log the response from backend

//       if (data.success) {
//         alert("Student added successfully!");
//       } else {
//         alert("Failed to add student.");
//       }

//       setName("");
//       setUsn("");
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error running add_faces.py:", error);
//       alert("Failed to run add_faces.py. Check the console for details.");
//     }
//   };

//   const runTest = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/execute-test", {
//         method: "POST",
//       });
//       const data = await response.json();
//       alert(data.message);
//     } catch (error) {
//       console.error("Error running test.py:", error);
//       alert("Failed to run test.py. Check the console for details.");
//     }
//   };
  
//   if (props.userType === 'admin') {
//     return (
//       <div className="App container">
//         <header className="App-header">
//           <h1 className="text-center mb-4">Face Recognition Control Panel</h1>
//           <div className="d-flex justify-content-center">
//             {!showForm ? (
//               <>
//                 <button
//                   className="btn btn-primary mx-2"
//                   onClick={() => setShowForm(true)}
//                 >
//                   Add a student
//                 </button>
//                 <button
//                   className="btn btn-primary mx-2"
//                   onClick={runTest}
//                 >
//                   Start Face recognition
//                 </button>
//                 <button
//                   className="btn btn-primary mx-2"
                  
//                 >
//                   Take Lecture
//                 </button>
//               </>
//             ) : (
//               <div className="form bg-light p-4 border rounded shadow-sm w-50">
//                 <h3>Add Student Details</h3>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     Name:
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter student name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="usn" className="form-label">
//                     USN:
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="usn"
//                     value={usn}
//                     onChange={(e) => setUsn(e.target.value)}
//                     placeholder="Enter USN"
//                   />
//                 </div>
//                 <button
//                   className="btn btn-primary mx-2"
//                   onClick={runAddFaces}
//                 >
//                   Submit
//                 </button>
//                 <button
//                   className="btn btn-secondary mx-2"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>
//       </div>
//     );
//   } else if(props.userType === 'student'){
//     return <StudentDashboard/>
//   }
//   else{
//     return <p>Please Login to view.</p>
//   }
// }

// export default Dashboard;
// Import necessary modules
import StudentDashboard from './StudentDashboard';
import {useState} from 'react';

function Dashboard(props) {
  const [showForm, setShowForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false); // State for Take Class form
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [classDate, setClassDate] = useState(""); // State for class date
  const [startTime, setStartTime] = useState(""); // State for start time
  const [endTime, setEndTime] = useState(""); // State for end time

  const buttonStyle = {
    width: '300px',  // set width to 200px
    height: '80px',  // set height to 50px
    backgroundImage: 'url(bg2.jpg)',
    display:'block',
    color: 'white',  // text color
    border: 'none',  // remove border
    borderRadius: '8px',  // rounded corners
    fontSize: '16px',  // text size
    cursor: 'pointer',  // cursor pointer on hover
  };
  const runAddFaces = async () => {
    if (!name || !usn) {
      alert("Please fill out both fields before submitting.");
      return;
    }

    console.log("Sending data:", { studentName: name, usn });

    try {
      const response = await fetch("http://localhost:5000/api/execute-add-faces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentName: name, usn }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (data.success) {
        alert("Student added successfully!");
      } else {
        alert("Failed to add student.");
      }

      setName("");
      setUsn("");
      setShowForm(false);
    } catch (error) {
      console.error("Error running add_faces.py:", error);
      alert("Failed to run add_faces.py. Check the console for details.");
    }
  };

  const runTest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/execute-test", {
        method: "POST",
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error running test.py:", error);
      alert("Failed to run test.py. Check the console for details.");
    }
  };

  // const scheduleClass = async () => {
  //   if (!classDate || !startTime || !endTime) {
  //     alert("Please fill out all fields before submitting.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/api/classes/addClass", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ date: classDate, startTime, endTime }),
  //     });

  //     const data = await response.json();
  //     console.log("Response from server:", data);

  //     if (data.message) {
  //       alert("Class scheduled successfully!");
  //     } else {
  //       alert("Failed to schedule class.");
  //     }

  //     setClassDate("");
  //     setStartTime("");
  //     setEndTime("");
  //     setShowClassForm(false);
  //   } catch (error) {
  //     console.error("Error scheduling class:", error);
  //     alert("Failed to schedule class. Check the console for details.");
  //   }
  // };
  const scheduleClass = async () => {
    if (!classDate || !startTime || !endTime) {
      alert("Please fill out all fields before submitting.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/classes/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: classDate, startTime, endTime }),
      });
  
      const data = await response.json();
      if (data.message) {
        alert("Class scheduled successfully!");
      } else {
        alert("Failed to schedule class.");
      }
    } catch (error) {
      console.error("Error scheduling class:", error);
      alert("Failed to schedule class. Check the console for details.");
    }
  };
  
  if (props.userType === 'admin') {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="text-center mb-4">Control Panel</h1>
          <div className="d-flex justify-content-center">
            {!showForm && !showClassForm ? (
              <>
                <button style={buttonStyle}
                  className="btn btn-primary mx-2"
                  onClick={() => setShowForm(true)}
                >
                  Add a student
                </button>
                <button style={buttonStyle}
                  className="btn btn-primary mx-2"
                  onClick={runTest}
                >
                  Start Face recognition
                </button>
                <button style={buttonStyle}
                  className="btn btn-primary mx-2"
                  onClick={() => setShowClassForm(true)}
                >
                  Take Lecture
                </button>
              </>
            ) : showForm ? (
              <div className="form bg-light p-4 border rounded shadow-sm w-50">
                <h3>Add Student Details</h3>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usn" className="form-label">
                    USN:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usn"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    placeholder="Enter USN"
                  />
                </div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={runAddFaces}
                >
                  Submit
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="form bg-light p-4 border rounded shadow-sm w-50">
                <h3>Schedule a Class</h3>
                <div className="mb-3">
                  <label htmlFor="classDate" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="classDate"
                    value={classDate}
                    onChange={(e) => setClassDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={scheduleClass}
                >
                  Submit
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setShowClassForm(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  } else if (props.userType === 'student') {
    return <StudentDashboard/>;
  } else {
    return <p>Please Login to view.</p>;
  }
}

export default Dashboard;
