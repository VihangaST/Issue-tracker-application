import Issue from "../models/Issue.js";
import Sequelize from "sequelize";

export const fetchIssues = async (req, res) => {
  try {
    // extract query parameters
    const {
      searchTerm = "",
      statusFilter = "",
      priorityFilter = "",
      page = 1,
      pageSize = 10,
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

    // Pagination logic
    //no of issues per page
    const limit = parseInt(pageSize, 10) || 10;
    // starting index for the current page
    const offset = ((parseInt(page, 10) || 1) - 1) * limit;

    // Fetch issues only for requested page pagination and total count
    const { rows: issues, count: totalIssueCount } =
      await Issue.findAndCountAll({
        where,
        limit,
        offset,
        // order: [["createdAt", "DESC"]],
      });

    res.status(200).json({
      message: "Issues fetched successfully",
      issues,
      totalIssueCount,
      page: parseInt(page, 10) || 1,
      pageSize: limit,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add issue controller
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
