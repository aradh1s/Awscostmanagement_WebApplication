import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./DashboardPage.css"; // Import CSS for styling

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function DashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://localhost:5000/dashboard-data");
                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError("Failed to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading dashboard data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!dashboardData) {
        return <p>No dashboard data available.</p>;
    }

    const { historical, cost_breakdown, forecast } = dashboardData;

    // Historical Costs Chart
    const historicalChartData = {
        labels: historical.map((item) => item.period),
        datasets: [
            {
                label: "Total Costs",
                data: historical.map((item) => item.total_cost),
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
        ],
    };

    // Cost Breakdown Chart
    const costBreakdownChartData = {
        labels: Object.keys(cost_breakdown),
        datasets: [
            {
                label: "Cost by Service",
                data: Object.values(cost_breakdown),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    // Forecast Chart
    const forecastChartData = {
        labels: forecast.map((item) => item.month),
        datasets: [
            {
                label: "Forecasted Costs",
                data: forecast.map((item) => item.forecasted_cost),
                borderColor: "rgba(255,99,132,1)",
                fill: false,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-item">
                <h4>Historical Cost Trends</h4>
                <Line data={historicalChartData} />
            </div>
            <div className="dashboard-item">
                <h4>Cost Breakdown by Service</h4>
                <Pie data={costBreakdownChartData} />
            </div>
            <div className="dashboard-item">
                <h4>Forecasted Costs</h4>
                <Line data={forecastChartData} />
            </div>
            <div className="dashboard-item">
                <h4>Placeholder Widget</h4>
                <p>This is a placeholder for additional insights or widgets.</p>
            </div>
        </div>
    );
}

export default DashboardPage;
