import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/claims");
        setClaims(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchClaims();
  }, []);

  if (error) return <p style={{ color: "red" }}>Error : {error}</p>;

  if (!claims.length) return <p>Loading Claims</p>;

  return (
    <div>
      <h2>Claims List</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim._id}>
            <strong>{claim.claimReason}</strong> - Rs{claim.claimAmount}(
            {claim.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimList;
