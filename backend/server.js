import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synced"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
