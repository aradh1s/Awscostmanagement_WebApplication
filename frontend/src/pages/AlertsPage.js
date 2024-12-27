import React, { useState, useEffect } from "react";
import AlertForm from "../components/AlertForm";
import AlertList from "../components/AlertList";

function AlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch alerts from the backend
    const fetchAlerts = async () => {
        try {
            const response = await fetch("http://localhost:5000/alerts");
            const data = await response.json();
            setAlerts(data);
        } catch (error) {
            console.error("Error fetching alerts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Create and Manage Alerts</h2>

            {/* Create Alert Form */}
            <div className="mb-5">
                <h3>Create a New Alert</h3>
                <AlertForm onAlertCreated={fetchAlerts} />
            </div>

            {/* Current Alerts List */}
            <div>
                <h3>Current Alerts</h3>
                {loading ? (
                    <p>Loading alerts...</p>
                ) : alerts.length === 0 ? (
                    <p>No alerts found. Create one to get started!</p>
                ) : (
                    <AlertList alerts={alerts} fetchAlerts={fetchAlerts} />
                )}
            </div>
        </div>
    );
}

export default AlertsPage;
