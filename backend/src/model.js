import mongoose from "mongoose"
import { Schema } from "mongoose"

const policySchema = new mongoose.Schema({
    
  id: String,
  policyNumber: String,
  customerName: String,
  policyType: String, // "Health", "Life", "Motor"
  premiumAmount: Number,
  coverageAmount: Number,
  

})

const claimSchema = new Schema({
  
    id: String,
  policyId: String,
  claimAmount: Number,
  claimReason: String,
  claimDate: String,
  status: String, 
  documentsSubmitted: Boolean

})


export const Policy = mongoose.model("Policy", policySchema)
export const Claim = mongoose.model("Claim", claimSchema)