import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import mentorRoutes from "./routes/mentor.routes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/mentor", mentorRoutes);
app.use("/api/admin", adminRoutes);

export default app;