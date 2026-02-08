import express from "express";
import { fetchIssues, addIssue } from "../controllers/issueController.js";
const router = express.Router();

router.get("/fetch", fetchIssues);
router.post("/add", addIssue);
export default router;
