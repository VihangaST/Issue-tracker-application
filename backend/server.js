import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import sequelize from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synced"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
