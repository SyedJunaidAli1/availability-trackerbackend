import express from "express";
import { auth, allowRoles } from "../middleware/auth.js";
import {
  getUsers,
  getMentors,
  getRecommendations,
  bookCall,
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
router.post("/book-call", auth, allowRoles("admin"), bookCall);

export default router;
