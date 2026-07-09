import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [interviewStatus, setInterviewStatus] = useState("");

  const handleMockInterview = () => {
    setInterviewStatus("⌛ Waiting for another user to join...");

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = () => {
      console.log("✅ WebSocket connected.");
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.type === "paired") {
          setInterviewStatus("🎉 Matched with a partner! Redirecting...");
          navigate("/interview-room");
        } else {
          setInterviewStatus(`📡 Status: ${data.message || "Waiting..."}`);
        }
      } catch (err) {
        console.warn("Non-JSON message received:", e.data);

        if (e.data.toLowerCase().includes("paired")) {
          setInterviewStatus("🎉 Matched with a partner! Redirecting...");
          navigate("/interview-room");
        } else {
          setInterviewStatus(`📡 Status: ${e.data}`);
        }
      }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      setInterviewStatus("❌ Connection error. Please try again.");
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket closed.");
    };
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const styles = {
    dashboardContainer: {
      display: "flex",
      backgroundColor: "#121212",
      color: "#fff",
      height: "100vh",
    },
    mainContent: {
      flex: 1,
      padding: "40px",
      overflowY: "auto",
    },
    mainBox: {
      backgroundColor: "#1e1e1e",
      padding: "30px",
      borderRadius: "10px",
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "0 0 10px rgba(255,255,255,0.1)",
    },
    mockTestBox: {
      backgroundColor: "#2a2a2a",
      padding: "20px",
      borderRadius: "8px",
    },
    mockInterviewBox: {
      backgroundColor: "#2a2a2a",
      padding: "20px",
      borderRadius: "8px",
    },
    btn: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    statusText: {
      marginTop: "10px",
      fontStyle: "italic",
      color: "#ccc",
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar user={user} />

      <div style={styles.mainContent}>
        <h1>Welcome, {user?.displayName || "User"} 👋</h1>

        <div style={styles.mainBox}>
          {/* Coding Mock Test Section */}
          <div style={styles.mockTestBox}>
            <h3>🧪 Take Coding Mock Test</h3>
            <p>Practice real LeetCode-style questions with a timer.</p>
            <button style={styles.btn}>Start Test</button>
          </div>

          {/* Mock Interview Section */}
          <div style={styles.mockInterviewBox}>
            <h3>🎤 Mock Interview</h3>
            <p>Pair up with other students and simulate real interviews.</p>
            <button style={styles.btn} onClick={handleMockInterview}>
              Start Interview
            </button>
            <p style={styles.statusText}>{interviewStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
