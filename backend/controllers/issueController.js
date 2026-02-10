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
    // Extract userId from JWT middleware (use id from JWT payload)
    const userId = req.user?.id;

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

// add issue controller
export const addIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body.formData;
    console.log("Received issue data:", {
      title,
      description,
      status,
      priority,
    });
    // Extract userId from JWT middleware (use id from JWT payload)
    const userId = req.user?.id;
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
// delete issue
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

// update issue
export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body.formData;
    // Extract userId from JWT middleware (use id from JWT payload)
    const userId = req.user?.id;
    console.log("Received update for issue ID:", id, "with data:", {
      title,
      description,
      status,
      priority,
      userId,
    });
    const [updated] = await Issue.update(
      { title, description, status, priority, userId },
      { where: { id } },
    );
    if (updated) {
      const updatedIssue = await Issue.findOne({ where: { id } });
      res
        .status(200)
        .json({ message: "Issue updated successfully", issue: updatedIssue });
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// fetch status counts
export const statusCounts = async (req, res) => {
  try {
    // Extract userId from JWT middleware (use id from JWT payload)
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const statusCounts = await Issue.findAll({
      where: { userId },
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });
    console.log("Fetched status counts for user ID:", userId, statusCounts);
    res
      .status(200)
      .json({ message: "Status counts fetched successfully", statusCounts });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
