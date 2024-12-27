import React, { useState, useEffect } from "react";
import AlertList from "../components/AlertList";

function CurrentAlertsPage() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch alerts from the backend
        const fetchAlerts = async () => {
            try {
                const response = await fetch("http://localhost:5000/alerts");
                const data = await response.json();
                setAlerts(data);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Current Alerts</h2>
            <AlertList alerts={alerts} />
        </div>
    );
}

export default CurrentAlertsPage;
