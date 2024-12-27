import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function CostForecastPage() {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch("http://localhost:5000/forecast");
                const data = await response.json();
                setForecastData(data);
            } catch (err) {
                setError("Failed to fetch forecast data.");
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, []);

    if (loading) return <p>Loading forecast data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!forecastData || !forecastData.historical || !forecastData.forecast) {
        return <p>No forecast data available.</p>;
    }

    const chartData = {
        labels: [
            ...forecastData.historical.map((_, idx) => `Month ${idx + 1}`),
            ...forecastData.months,
        ],
        datasets: [
            {
                label: "Historical Costs",
                data: forecastData.historical,
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Forecasted Costs",
                data: [
                    ...Array(forecastData.historical.length).fill(null),
                    ...forecastData.forecast,
                ],
                borderColor: "rgba(255,99,132,1)",
                borderDash: [5, 5],
                fill: false,
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h2>Cost Forecasting</h2>
            <p>Visualize historical and forecasted AWS costs.</p>
            <Line data={chartData} />
        </div>
    );
}

export default CostForecastPage;
