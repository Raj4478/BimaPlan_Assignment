import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/policies.css";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/policies");
        setPolicies(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="policies-page-bg">
      <div className="policies-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h1 className="policies-title">Comprehensive Insurance Policies</h1>
        <p className="policies-subtitle">
          Protecting your future with tailored insurance solutions
        </p>
      </div>
      <div className="policies-list-section">
        <h2 className="policies-list-title">Available Policies</h2>
        {loading ? (
          <div className="policies-loading">Loading Policies...</div>
        ) : error ? (
          <div className="policies-error">Error: {error}</div>
        ) : policies.length === 0 ? (
          <div className="policies-empty">No policies found.</div>
        ) : (
          <div className="policies-card-list">
            {policies.map((policy) => (
              <div className="policy-card" key={policy.id || policy._id}>
                <div className="policy-card-header">
                  <span className="policy-card-type">{policy.policyType}</span>
                  <span className="policy-card-id">ID: {policy.id}</span>
                </div>
                <div className="policy-card-body">
                  <div className="policy-card-premium">
                    ₹{policy.premiumAmount}
                  </div>
                  <div className="policy-card-label">Premium Amount</div>
                  <div className="policy-card-coverage">
                    ₹{policy.coverageAmount}
                  </div>
                  <div className="policy-card-coverage-label">
                    Coverage Amount
                  </div>
                </div>
                <div className="policy-card-footer">
                  <span className="policy-card-duration">
                    Duration: {policy.duration || "1 Year"}
                  </span>
                  <button className="policy-select-btn">Select Policy</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Policies;
