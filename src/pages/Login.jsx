import React, { useState, } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import CookieWarning from '../components/CookieWarning';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading,error } = useSelector((state) => state.auth);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        username,
        password,
      };

      const response = await dispatch(loginUser(userCredentials));
      const success = response.payload;
      console.log(success)
      if (success) {
        setUsername('');
        setPassword('');
        navigate('/dashboard/content');
      }

      else{
        console.log(error)
      }
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="signUp-body">
      <CookieWarning/>
       <div className="signup-container">
      <h1>Welcome Back</h1>

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
          <label htmlFor="password">Password</label>
          <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required />
        </div>
        <div className="checkbox">

        <input type="checkbox" id="show" onChange={togglePasswordVisibility}/>
        <label htmlFor="">show password</label>


        </div>


        { loading ? <Loading/> : 
        <button type="button" className="signup-button"
          onClick={handleSubmit}>
          LOGIN
        </button>}

        {error && <p style={{marginTop: "10px"}} className="alert alert-danger" role="alert">{error}</p>}

      </form>

      <p className="login-link">
        
        New here? <NavLink to="/signup">SIGN UP</NavLink>
      </p>
    </div>

    </div>
   
  );
};


export default Login;