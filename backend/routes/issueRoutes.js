import express from "express";
import {
  fetchIssues,
  addIssue,
  deleteIssue,
  updateIssue,
} from "../controllers/issueController.js";
const router = express.Router();

router.get("/fetch", fetchIssues);
router.post("/add", addIssue);
router.delete("/delete/:id", deleteIssue);
router.put("/update/:id", updateIssue);

export default router;
