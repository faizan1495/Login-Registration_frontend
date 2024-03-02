import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './CSS/Register.css'

function Register() {
  const [employeename, setEmployeename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!employeename.trim()) {
      errors.employeename = "Employee name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  async function save(event) {
    event.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("https://login-registration-backend-v05t.onrender.com/api/v1/employee/save", {
          employeename: employeename,
          email: email,
          password: password,
        });
        alert("Employee Registration Successfully");
        navigate('/');
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Employee Registration</h1>

          <form>
            <div className="form-group">
              <label>Employee name</label>
              <input
                type="text"
                className="form-control"
                id="employeename"
                placeholder="Enter Name"
                value={employeename}
                onChange={(event) => {
                  setEmployeename(event.target.value);
                }}
              />
              {errors.employeename && (
                <div className="error">{errors.employeename}</div>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={save}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
