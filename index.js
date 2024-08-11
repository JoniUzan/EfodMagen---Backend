const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { verifyToken } = require("./middleware/authentication_middleware");

dotenv.config();

async function main() {
  await connectDB();
  app.use(express.static("public"));
  app.use(express.json());

  app.use(cors());

  const authRoutes = require("./routers/auth_router");
  const sheltersRoutes = require("./routers/shelters_router");
  const userRoutes = require("./routers/users_router");

  app.use("/api/auth", authRoutes);
  app.use("/api/shelters", verifyToken, sheltersRoutes);
  app.use("/api/loggedInUser", verifyToken, userRoutes);

  //   app.get("*", (req, res) => {
  //     res.sendFile(path.join(__dirname, "public", "index.html"));
  //   });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
