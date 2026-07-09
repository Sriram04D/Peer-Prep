import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute";
import InterviewRoom from './pages/InterviewRoom';
<Route path="/interview-room" element={<InterviewRoom />} />


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
       
  
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
 


        <Route 
         path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
