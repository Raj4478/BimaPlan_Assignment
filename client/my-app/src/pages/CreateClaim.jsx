import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreateClaim.css";


const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || '/api');

const CreateClaim = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyId: "",
    claimAmount: "",
    claimReason: "",
    documentsSubmitted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation patterns
  const validationPatterns = {
    policyId: {
      pattern: /^[A-Za-z]{2,4}[-]?[0-9]{3,8}$/,
      message:
        "Policy ID must be 2-4 letters followed by 3-8 digits (e.g., POL001, POL-001, HEALTH1234)",
    },
    claimAmount: {
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      message:
        "Claim amount must be a positive number with up to 2 decimal places",
    },
    claimReason: {
      pattern: /^.{10,500}$/,
      message: "Claim reason must be between 10 and 500 characters",
    },
  };

  const generateClaimId = () => {
    return (
      "CLM-" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  };

  const validateField = (name, value) => {
    const pattern = validationPatterns[name];
    if (
      pattern &&
      value &&
      value.toString().trim() &&
      !pattern.pattern.test(value.toString().trim())
    ) {
      return pattern.message;
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value && value.trim() && name !== "documentsSubmitted") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(validationPatterns).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Check for empty required fields
    if (!formData.policyId.trim()) {
      newErrors.policyId = "Policy ID is required";
    }
    if (!formData.claimAmount.trim()) {
      newErrors.claimAmount = "Claim amount is required";
    }
    if (!formData.claimReason.trim()) {
      newErrors.claimReason = "Claim reason is required";
    }

    const claimAmountNum = parseFloat(formData.claimAmount);
    if (isNaN(claimAmountNum) || claimAmountNum <= 0) {
      newErrors.claimAmount =
        "Claim amount must be a positive number greater than 0";
    }

    const reasonLength = formData.claimReason.trim().length;
    if (reasonLength > 0 && (reasonLength < 10 || reasonLength > 500)) {
      newErrors.claimReason =
        "Claim reason must be between 10 and 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const claimData = {
        id: generateClaimId(),
        policyId: formData.policyId.trim().toUpperCase(),
        claimAmount: parseFloat(formData.claimAmount),
        claimReason: formData.claimReason.trim(),
        claimDate: new Date(),
        status: "Pending",
        documentsSubmitted: formData.documentsSubmitted,
      };

      console.log("Submitting claim data:", claimData);

      const response = await axios.post(
        `${API_BASE_URL}/claims`,
        claimData
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/claims");
      }, 2000);
    } catch (error) {
      console.error("Error creating claim:", error);
      setErrors({
        submit: `Failed to create claim: ${
          error.response?.data?.error || error.message
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      policyId: "",
      claimAmount: "",
      claimReason: "",
      documentsSubmitted: false,
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  if (submitSuccess) {
    return (
      <div className="create-claim-page-bg">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2 className="success-title">Claim Created Successfully!</h2>
            <p className="success-message">
              Your claim has been submitted and is being processed. You will be
              redirected to the claims page shortly.
            </p>
            <Link to="/claims" className="success-button">
              View Claims
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-claim-page-bg">
      <div className="create-claim-header">
        <Link to="/claims" className="back-button">
          ← Back to Claims
        </Link>
        <h1 className="create-claim-title">Submit New Claim</h1>
        <p className="create-claim-subtitle">
          Fill out the form below to submit your insurance claim
        </p>
      </div>

      <div className="create-claim-container">
        <form onSubmit={handleSubmit} className="claim-form">
          <div className="form-group">
            <label htmlFor="policyId" className="form-label">
              Policy ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="policyId"
              name="policyId"
              value={formData.policyId}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-input ${errors.policyId ? "error" : ""}`}
              placeholder="e.g., POL12345"
              maxLength={15}
            />
            {errors.policyId && (
              <span className="error-message">{errors.policyId}</span>
            )}
            <span className="form-hint">
              Format: 2-4 letters followed by 3-8 digits
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="claimAmount" className="form-label">
              Claim Amount (₹) <span className="required">*</span>
            </label>
            <input
              type="text"
              id="claimAmount"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-input ${errors.claimAmount ? "error" : ""}`}
              placeholder="e.g., 50000.00"
              maxLength={12}
            />
            {errors.claimAmount && (
              <span className="error-message">{errors.claimAmount}</span>
            )}
            <span className="form-hint">
              Enter amount in rupees (up to 2 decimal places)
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="claimReason" className="form-label">
              Claim Reason <span className="required">*</span>
            </label>
            <textarea
              id="claimReason"
              name="claimReason"
              value={formData.claimReason}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.claimReason ? "error" : ""}`}
              placeholder="Describe the reason for your claim in detail..."
              rows="4"
              maxLength={500}
            />
            {errors.claimReason && (
              <span className="error-message">{errors.claimReason}</span>
            )}
            <span className="form-hint">
              {formData.claimReason.length}/500 characters (minimum 10 required)
            </span>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="documentsSubmitted"
                checked={formData.documentsSubmitted}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="checkmark"></span>I have submitted all required
              documents
            </label>
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="reset-button"
              disabled={loading}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={
                loading ||
                Object.keys(errors).some(
                  (key) => key !== "submit" && errors[key]
                )
              }
            >
              {loading ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClaim;
