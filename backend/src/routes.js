import { Router } from "express";
import { Claim, Policy } from "./model.js";

const router = Router();

router.post("/claims", async (req, res) => {
  try {
    const {
      id,
      policyId,
      claimAmount,
      claimReason,
      claimDate,
      status,
      documentsSubmitted,
    } = req.body;

    const claims = await Claim.create({
      id,
      policyId,
      claimAmount,
      claimReason,
      claimDate,
      status,
      documentsSubmitted,
    });
    res.status(201).json({ claims, message: "Claim created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/claims", async (req, res) => {
  try {
    const { status, policyId } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (policyId) {
      filter.policyId = policyId;
    }
    const claims = await Claim.find(filter);
    res.json(claims);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/policies", async (req, res) => {
  try {
    const policy = await Policy.find();
    res.json(policy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/claims/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        error: "INVALID_STATUS",
        message: "Status must be one of: Pending, Approved, Rejected",
        statusCode: 400,
      });
    }
    const updatedClaim = await Claim.findOneAndUpdate(
      { id: id },
      { status: status },
      { new: true }
    );
    if (!updatedClaim) {
      return res.status(404).json({
        error: "CLAIM_NOT_FOUND",
        message: "Claim not found",
        statusCode: 404,
      });
    }
    res.json(updatedClaim);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to update claim status",
      statusCode: 500,
    });
  }
});

export default router;
