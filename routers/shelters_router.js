
const express = require("express");
const router = express.Router();
const {
  findShelter,
  //getShelterById
  deleteShelterkById,
  updateShelter,
  createShelter,
} = require("../controllers/shelters_controller");
const { verifyToken } = require("../middleware/authentication_middleware");

router.get("/", findShelter);
//router.get("/details/:id", verifyToken, getShelterById);
router.post("/", verifyToken, createShelter);
router.delete("/:id", verifyToken, deleteShelterkById);
router.put("/:id", verifyToken, updateShelter);

module.exports = router;
