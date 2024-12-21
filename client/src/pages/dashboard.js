// import React,{useState} from 'react';
// import StudentDashboard from './StudentDashboard';
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
//                   className="btn btn-success mx-2"
//                   onClick={runTest}
//                 >
//                   Start Face recognition
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
//   } else {
//     return <StudentDashboard/>
//   }
// }

// export default Dashboard;import React,{useState} from 'react';
import StudentDashboard from './StudentDashboard';
import {useState} from 'react';
function Dashboard(props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  console.log(`props is sent ${props.userType}`);

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
        body: JSON.stringify({ studentName: name, usn }), // Ensure proper structure
      });

      const data = await response.json();
      console.log("Response from server:", data); // Log the response from backend

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

  if (props.userType === 'admin') {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="text-center mb-4">Face Recognition Control Panel</h1>
          <div className="d-flex justify-content-center">
            {!showForm ? (
              <>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => setShowForm(true)}
                >
                  Add a student
                </button>
                <button
                  className="btn btn-success mx-2"
                  onClick={runTest}
                >
                  Start Face recognition
                </button>
              </>
            ) : (
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
            )}
          </div>
        </header>
      </div>
    );
  } else {
    return <StudentDashboard/>
  }
}

export default Dashboard;