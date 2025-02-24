import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import Loading from "../components/Loading";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }
    e.preventDefault();

    try {
      let userCredentials = {
        username,
        password,
        phoneNumber,
      };
      const response = await dispatch(registerUser(userCredentials));
      const success = response.payload.success;
      if (success) {
        setUsername("");
        setPassword("");
        setPhoneNumber("");
        setConfirmPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUp-body">
      <div className="signup-container">
        <h1>Create Account</h1>
        <p>Create a great platform for managing your cases & clients</p>

        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="email"
              placeholder="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Mobile Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phoneNumber"
              placeholder="91 987654321"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="show"
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="">show password</label>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <button
              type="button"
              className="signup-button"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          )}

          {error && (
            <p
              style={{ marginTop: "10px" }}
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>
        <NavLink to="/login">
          <p className="login-link">Already a member? LOGIN</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
