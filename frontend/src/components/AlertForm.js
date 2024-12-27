import React, { useState } from "react";
import axios from "axios";

function AlertForm({ onAlertCreated }) {
    const [threshold, setThreshold] = useState(""); // State to store the threshold
    const [responseMessage, setResponseMessage] = useState(""); // State to store server response

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/alerts/create", {
                threshold: parseFloat(threshold),
            });
            setResponseMessage(response.data.message);
            setThreshold(""); // Clear the input field

            // Call the parent callback to update the alerts list
            if (onAlertCreated) onAlertCreated();
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || "An error occurred. Please try again.";
            setResponseMessage(errorMessage);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create Billing Alert</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="threshold" style={styles.label}>
                    Threshold ($):
                </label>
                <input
                    type="number"
                    id="threshold"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    required
                    min="1"
                    step="0.01"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Create Alert
                </button>
            </form>
            {responseMessage && <p style={styles.message}>{responseMessage}</p>}
        </div>
    );
}

const styles = {
    container: {
        margin: "20px auto",
        maxWidth: "400px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    label: {
        fontSize: "16px",
        marginBottom: "5px",
    },
    input: {
        marginBottom: "10px",
        padding: "5px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        padding: "8px 16px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    message: {
        marginTop: "15px",
        color: "green",
        fontWeight: "bold",
    },
};

export default AlertForm;
