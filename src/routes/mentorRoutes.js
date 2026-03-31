import express from "express";
import { auth, allowRoles } from "../middleware/auth.js";
import {
  addAvailability,
  getMyAvailability,
} from "../controllers/availabilityController.js";

const router = express.Router();

router.post("/availability", auth, allowRoles("mentor"), addAvailability);

router.get("/availability", auth, allowRoles("mentor"), getMyAvailability);

export default router;
