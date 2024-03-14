import express from "express"
import { verifyToken } from "../utils/verifyUser"
import { createListing } from "../controllers/listing.controller"

const router=express.Router();
router.post("/create",verifyToken,createListing)
export default router;