import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Welcome to AWS Cost Management</h1>
            <p className="lead">
                This platform helps you manage AWS costs efficiently. Create cost alerts, view existing alerts, and explore cost optimization suggestions.
            </p>
            <div className="mt-4">
                <Link to="/alerts" className="btn btn-primary btn-lg mx-2">
                    Create Alerts
                </Link>
                <Link to="/cost-suggestions" className="btn btn-secondary btn-lg mx-2">
                    Cost Suggestions
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
