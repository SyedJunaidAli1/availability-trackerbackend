import express from "express";
import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import mentorRoutes from "./routes/mentor.routes.js";
// import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/mentor", mentorRoutes);
// app.use("/api/admin", adminRoutes);

export default app;