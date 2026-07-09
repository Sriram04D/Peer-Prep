import React, { useState } from "react";

const Sidebar = ({ user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.section}>
        <p onClick={toggleProfile} style={styles.sectionTitle}>👤 Profile</p>
        {showProfile && (
          <div style={styles.profileDetails}>
            <p style={styles.detail}><strong>Name:</strong> {user?.displayName || "N/A"}</p>
            <p style={styles.detail}><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p style={styles.detail}><strong>Mobile:</strong> {user?.phoneNumber || "Not Provided"}</p>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>🕓 Past Sessions</p>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>📚 Learn</p>
      </div>

      {/* Logout Button at the Bottom */}
      <div style={styles.logoutContainer}>
        <button onClick={onLogout} style={styles.logoutButton}>🚪 Logout</button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "260px",
    backgroundColor: "#1f1f1f",
    padding: "30px 20px",
    color: "#ffffff",
    height: "100vh",
    boxSizing: "border-box",
    borderRight: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "22px",
    marginBottom: "30px",
    color: "#ffffff",
  },
  section: {
    marginBottom: "20px",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: "16px",
    color: "#b3b3b3",
    marginBottom: "10px",
  },
  profileDetails: {
    fontSize: "14px",
    backgroundColor: "#2a2a2a",
    padding: "10px",
    borderRadius: "6px",
  },
  detail: {
    marginBottom: "8px",
    color: "#dddddd",
  },
  logoutContainer: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid #444",
  },
  logoutButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Sidebar;
