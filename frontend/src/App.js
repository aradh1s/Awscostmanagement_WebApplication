import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AlertsPage from "./pages/AlertsPage";
import CostSuggestionsPage from "./pages/CostSuggestionsPage";
import CostForecastPage from "./pages/CostForecastPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/cost-suggestions" element={<CostSuggestionsPage />} />
                <Route path="/cost-forecast" element={<CostForecastPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
