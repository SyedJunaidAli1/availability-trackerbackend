import express from "express";
import { auth, allowRoles } from "../middleware/auth.js";
import { getUsers, getMentors } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth, allowRoles("admin"), getUsers);
router.get("/mentors", auth, allowRoles("admin"), getMentors);

export default router;
