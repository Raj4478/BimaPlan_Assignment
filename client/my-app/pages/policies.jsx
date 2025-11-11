import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p style={{ color: "blue" }}>Loading Policies...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Available Policies</h1>
      {Policies.length === 0 ? (
        <p>No Polices Found</p>
      ) : (
        <table>
          <tr>
            <th>Policy ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Coverage Amount</th>
          </tr>
          {policies.map((policy) => {
            <tr key={policy.key}>
              <td>{policy.id}</td>
              <td>{policy.policyType}</td>
              <td>{policy.preiumAmount}</td>
              <td>{policy.coverageAmount}</td>
            </tr>;
          })}
        </table>
      )}
    </div>
  );
};
export default Policies;
