import React, { useEffect, useState } from "react";
import axios from "axios";

function SuggestionsList() {
    const [billingSuggestions, setBillingSuggestions] = useState([]);
    const [trustedAdvisorMessage, setTrustedAdvisorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                // Fetch Billing Data
                const billingResponse = await axios.get("http://localhost:5000/suggestions/billing");
                setBillingSuggestions(billingResponse.data);

                // Fetch Trusted Advisor Message
                const taResponse = await axios.get("http://localhost:5000/suggestions");
                setTrustedAdvisorMessage(taResponse.data.message);
            } catch (err) {
                setError("Failed to fetch suggestions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    if (loading) return <p>Loading suggestions...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Cost Optimization Suggestions</h2>

            {/* Display Trusted Advisor Message */}
            <div style={styles.trustedAdvisor}>
                <h3>AWS Premium Support Plan needed for access to Trusted Advisor</h3>
                <p>{trustedAdvisorMessage}</p>
            </div>

            {/* Display Billing Suggestions */}
            <div style={styles.billing}>
                <h3>Billing Data</h3>
                {billingSuggestions.length === 0 ? (
                    <p>No billing data found.</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Cost</th>
                                <th>Suggestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingSuggestions.map((suggestion, index) => (
                                <tr key={index}>
                                    <td>{suggestion.Service}</td>
                                    <td>{suggestion.Cost}</td>
                                    <td>{suggestion.Suggestion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        margin: "20px auto",
        maxWidth: "800px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "10px",
    },
    trustedAdvisor: {
        marginBottom: "20px",
        padding: "10px",
        backgroundColor: "#f8d7da",
        border: "1px solid #f5c6cb",
        borderRadius: "5px",
        color: "#721c24",
    },
    billing: {
        marginTop: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
    },
    th: {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#f9f9f9",
    },
    td: {
        border: "1px solid #ccc",
        padding: "8px",
    },
};

export default SuggestionsList;
