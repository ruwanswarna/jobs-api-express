import express from "express";
import authRouter from "./auth.js";
import jobsRouter from "./jobs.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/jobs", jobsRouter);

export default router;
