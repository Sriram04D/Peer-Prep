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
      // Firebase Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Save user to MongoDB
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebase_uid: user.uid,
            name: user.displayName || "",
            email: user.email,
            photo_url: user.photoURL || ""
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      console.log("✅ User saved to MongoDB");

      navigate('/dashboard');

    }catch (err) {
  console.error(err);

  alert(
    "Code: " + (err.code || "No code") +
    "\nMessage: " + (err.message || "No message")
  );
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

            <span className="forgot-pass">
              Forgot Password?
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <div className="login-or">Or Login With</div>

        <div className="social-login">
          <button className="social-btn">G</button>
          <button className="social-btn">f</button>
        </div>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </p>
      </div>

      <div className="login-right">
        <img src="/illusion.jpg" alt="Background" />
      </div>
    </div>
  );
};

export default Login;