import React from "react";
import axios from "axios";

function AlertList({ alerts, fetchAlerts }) {
    const deleteAlert = async (alarmName) => {
        try {
            await axios.delete(`http://localhost:5000/alerts/${alarmName}`);
            fetchAlerts(); // Refresh the alerts list after deletion
        } catch (err) {
            console.error("Failed to delete alert:", err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Current Alerts</h2>
            {alerts.length === 0 ? (
                <p>No alerts found.</p>
            ) : (
                <ul style={styles.list}>
                    {alerts.map((alert) => (
                        <li key={alert.AlarmName} style={styles.listItem}>
                            {alert.AlarmName} - ${alert.Threshold}
                            <button
                                onClick={() => deleteAlert(alert.AlarmName)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
    container: {
        margin: "20px auto",
        maxWidth: "600px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "10px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        padding: "10px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    deleteButton: {
        padding: "5px 10px",
        fontSize: "14px",
        color: "#fff",
        backgroundColor: "#dc3545",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default AlertList;
