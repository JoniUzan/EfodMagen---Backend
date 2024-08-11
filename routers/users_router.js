const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/users_controller");

router.get("/", getUserById);

module.exports = router;