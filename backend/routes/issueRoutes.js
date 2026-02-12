import express from "express";
import {
  fetchIssues,
  addIssue,
  deleteIssue,
  updateIssue,
  statusCounts,
} from "../controllers/issueController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/fetch", authenticateToken, fetchIssues);
router.post("/add", authenticateToken, addIssue);
router.delete("/delete/:id", authenticateToken, deleteIssue);
router.put("/update/:id", authenticateToken, updateIssue);
router.get("/status-counts", authenticateToken, statusCounts);

export default router;
