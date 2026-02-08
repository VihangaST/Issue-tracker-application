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
      where[Sequelize.Op.or] = [
        { title: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
      ];
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
