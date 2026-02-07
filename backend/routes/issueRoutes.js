import express from "express";
import { fetchIssues } from "../controllers/issueController.js";
const router = express.Router();

router.get("/fetch", fetchIssues);
export default router;
