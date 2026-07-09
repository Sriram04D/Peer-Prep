import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Welcome Back</h2>
        <p>Please enter your details</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot-pass">Forgot Password?</span>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <div className="login-or">Or Login With</div>

        <div className="social-login">
          <button className="social-btn">G</button>
          <button className="social-btn">f</button>
        </div>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </div>

      <div className="login-right">
        <img src="/illusion.jpg" alt="Illusion background" />
      </div>
    </div>
  );
};

export default Login;
