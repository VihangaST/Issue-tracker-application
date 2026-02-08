import Issue from "../models/Issue.js";
import Sequelize from "sequelize";
export const fetchIssues = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const {
      searchTerm = "",
      statusFilter = "",
      priorityFilter = "",
    } = req.query;
    const userId = "1";
    const where = {};
    if (statusFilter) where.status = statusFilter;
    if (priorityFilter) where.priority = priorityFilter;
    if (userId) where.userId = userId;
    if (searchTerm) {
      where.title = { [Sequelize.Op.like]: `%${searchTerm}%` };
    }
    console.log("Constructed where clause for issue fetch:", where);

    const issues = await Issue.findAll({ where });

    res
      .status(200)
      .json({ message: "Issues fetched successfully", issues: issues });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const addIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body.formData;
    console.log("Received issue data:", {
      title,
      description,
      status,
      priority,
    });
    const userId = "1";
    const newIssue = await Issue.create({
      title,
      description,
      status,
      priority,
      userId,
    });
    res
      .status(201)
      .json({ message: "Issue added successfully", issue: newIssue });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received request to delete issue with ID:", id);
    const deleted = await Issue.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Issue deleted successfully" });
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
