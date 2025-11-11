import mongoose from "mongoose";
import { Schema } from "mongoose";

const policySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    policyType: {
      type: String,
      required: true,
      enum: ["Health", "Life", "Motor"],
    },
    premiumAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    coverageAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const claimSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    policyId: {
      type: String,
      required: true,
      ref: "Policy",
    },
    claimAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    claimReason: {
      type: String,
      required: true,
      maxlength: 500,
    },
    claimDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    documentsSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Policy = mongoose.model("Policy", policySchema);
export const Claim = mongoose.model("Claim", claimSchema);

export const generateClaimId = () => {
  return (
    "CLM-" + Date.now().toString(36) + Math.random().toString(36).substr(2)
  );
};
