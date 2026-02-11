import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL (Sequelize) connected successfully");
  } catch (error) {
    console.error("Unable to connect:", error);
  }
};

testConnection();

export default sequelize;
