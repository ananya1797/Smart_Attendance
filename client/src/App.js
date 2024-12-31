// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import Attendance from "./pages/attendance";
// import Reports from "./pages/Reports";

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* Navigation Bar */}
//         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//           <div className="container">
//             <Link className="navbar-brand" to="/">
//               Smart Attendance System
//             </Link>
//             <div className="collapse navbar-collapse">
//               <ul className="navbar-nav ms-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/attendance">
//                     Attendance
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/reports">
//                     Reports
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className="container mt-5">
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/attendance" element={<Attendance />} />
//             <Route path="/reports" element={<Reports />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Attendance from "./pages/attendance";
import Reports from "./pages/Reports";

function App() {
  const [userType, setUserType] = useState(""); // userType state to hold the value from Login

  // Handle the userType passed from Login
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };
  console.log(userType)

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h1>MARKMATE</h1><h6>Take attendance the smart way!</h6>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/attendance">
                    Attendance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">
                    Reports
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Login onUserTypeChange={handleUserTypeChange} />} />
            <Route path="/dashboard" element={<Dashboard userType={userType} />} />
            <Route path="/attendance" element={<Attendance userType={userType} />} />
            <Route path="/reports" element={<Reports userType={userType} />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
