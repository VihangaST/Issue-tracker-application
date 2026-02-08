import express from "express";
import {
  fetchIssues,
  addIssue,
  deleteIssue,
} from "../controllers/issueController.js";
const router = express.Router();

router.get("/fetch", fetchIssues);
router.post("/add", addIssue);
router.delete("/delete/:id", deleteIssue);
export default router;
