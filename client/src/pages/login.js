// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onUserTypeChange }) => {
//   const [userType, setUserType] = useState("admin");
//   const [identifier, setIdentifier] = useState(""); // Email for Admin, USN for Student
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Pass the userType to App.js
//     onUserTypeChange(userType);

//     // Hardcoded credentials
//     const adminCredentials = { email: "admin@gmail.com", password: "admin123" };
//     const studentCredentials = {usn: "usn123", password: "student123" };

//     if (
//       userType === "admin" &&
//       identifier === adminCredentials.email &&
//       password === adminCredentials.password
//     ) {
//       navigate("/dashboard");
//     } else if (
//       userType === "student" &&
//       identifier === studentCredentials.usn &&
//       password === studentCredentials.password
//     ) {
//       navigate("/attendance");
//     } else {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login to Begin!</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <label>User Type</label>
//           <select
//             className="form-control"
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="admin">Admin</option>
//             <option value="student">Student</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label>{userType === "admin" ? "Email" : "USN"}</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder={userType === "admin" ? "Enter email" : "Enter USN"}
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // External CSS for modern aesthetics

const Login = ({ onUserTypeChange }) => {
  const [userType, setUserType] = useState("admin");
  const [identifier, setIdentifier] = useState(""); // Email for Admin, USN for Student
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Pass the userType to App.js
    onUserTypeChange(userType);

    // Hardcoded credentials
    const adminCredentials = { email: "admin@gmail.com", password: "admin123" };
    const studentCredentials = { usn: "usn123", password: "student123" };

    if (
      userType === "admin" &&
      identifier === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      navigate("/dashboard");
    } else if (
      userType === "student" &&
      identifier === studentCredentials.usn &&
      password === studentCredentials.password
    ) {
      navigate("/attendance");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="sub-title">Please login to continue</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">User Type</label>
            <select
              className="form-control"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {userType === "admin" ? "Email" : "USN"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={userType === "admin" ? "Enter email" : "Enter USN"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
