import express from "express";
import { auth, allowRoles } from "../middleware/auth.js";
import {
  getUsers,
  getMentors,
  getRecommendations,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth, allowRoles("admin"), getUsers);
router.get("/mentors", auth, allowRoles("admin"), getMentors);
router.get(
  "/recommendations/:userId",
  auth,
  allowRoles("admin"),
  getRecommendations,
);

export default router;
