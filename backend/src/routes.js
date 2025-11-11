import { Router } from "express"
import { Claim, Policy } from "./model.js";

const router = Router();

router.post('/claims', async(req, res) => {

   try {
     const {
            id,
            policyId,
            claimAmount,
            claimReason,
            claimDate,
            status,
            documentsSubmitted,
         }        = req.body;
 
 
         const claims = await Claim.create({id,policyId,claimAmount,claimReason, claimDate, status, documentsSubmitted})
         res.status(201).json({claims, message : "Claim created successfully"})
   } catch (error) {
    console.error(error);
    res.status(400).json({error:error.message})
   }
})

router.get('/claims', async(req,res)=> {
    try {
        const claims = await Claim.find();
        res.json(claims);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : error.message})
    }

})

router.get('/policies',async(req,res) => {
    try {
        const policy = await Policy.find();
        res.json(policy);
    } catch (error) {
         console.error(error);
        res.status(500).json({error : error.message})
    }
})

export default router;