import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Claims.css";
const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingClaim, setUpdatingClaim] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/claims");
        setClaims(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  const updateClaimStatus = async (claimId, newStatus) => {
    try {
      setUpdatingClaim(claimId);
      const response = await axios.patch(
        `http://localhost:8000/api/claims/${claimId}/status`,
        {
          status: newStatus,
        }
      );

      // Update the local state with the updated claim
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === claimId ? response.data : claim
        )
      );
    } catch (error) {
      console.error("Error updating claim status:", error);
      setError(
        `Failed to update claim status: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setUpdatingClaim(null);
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusCycle = {
      Pending: "Approved",
      Approved: "Rejected",
      Rejected: "Pending",
    };
    return statusCycle[currentStatus] || "Pending";
  };

  return (
    <div className="claims-page-bg">
      <div className="claims-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h1 className="claims-title">
          Driving insurance adoption through technology
        </h1>
        <p className="claims-subtitle">
          To safeguard the people who are currently underserved by existing
          solutions
        </p>
      </div>
      <div className="claims-list-section">
        <div className="claims-list-header">
          <h2 className="claims-list-title">Your Claims</h2>
          <Link to="/create-claim" className="create-claim-button">
            + Create New Claim
          </Link>
        </div>
        {loading ? (
          <div className="claims-loading">Loading Claims...</div>
        ) : error ? (
          <div className="claims-error">Error: {error}</div>
        ) : claims.length === 0 ? (
          <div className="claims-empty">No claims found.</div>
        ) : (
          <div className="claims-card-list">
            {claims.map((claim) => (
              <div
                className={`claim-card claim-status-${claim.status.toLowerCase()}`}
                key={claim.id || claim._id}
              >
                <div className="claim-card-header">
                  <span className="claim-card-status">{claim.status}</span>
                  <span className="claim-card-date">
                    {new Date(claim.claimDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="claim-card-body">
                  <div className="claim-card-amount">₹{claim.claimAmount}</div>
                  <span className="claim-reason-label">Claim Description</span>
                  <div className="claim-card-reason">{claim.claimReason}</div>
                </div>
                <div className="claim-card-actions">
                  <button
                    className="status-update-btn"
                    onClick={() =>
                      updateClaimStatus(claim.id, getNextStatus(claim.status))
                    }
                    disabled={updatingClaim === claim.id}
                  >
                    {updatingClaim === claim.id
                      ? "Updating..."
                      : `Mark as ${getNextStatus(claim.status)}`}
                  </button>
                </div>
                <div className="claim-card-footer">
                  <span className="claim-card-policy">
                    Policy: {claim.policyId}
                  </span>
                  <span className="claim-card-docs">
                    Documents: {claim.documentsSubmitted ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimList;
