import express from "express";
import authRouter from "./auth.js";
import jobsRouter from "./jobs.js";
import authenticateUser from "../middleware/authentication.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/jobs", authenticateUser, jobsRouter);

export default router;
