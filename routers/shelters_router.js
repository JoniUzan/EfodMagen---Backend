const express = require("express");
const router = express.Router();
const {
  findShelter,
  findClosestShelters,
  deleteShelterkById,
  updateShelter,
  createShelter,
  getUserShelters,
  saveShelterToUser,
} = require("../controllers/shelters_controller");
const { verifyToken } = require("../middleware/authentication_middleware");

router.get("/", findShelter);
//router.get("/details/:id", verifyToken, getShelterById);
router.post("/", verifyToken, createShelter);
router.get("/closest-shelters", findClosestShelters);
router.get("/user-shelters", verifyToken, (req, res) => {
  console.log("GET /user-shelters route hit");
  getUserShelters(req, res);
});

router.post("/save-shelter", verifyToken, saveShelterToUser);
router.delete("/:id", verifyToken, deleteShelterkById);
router.put("/:id", verifyToken, updateShelter);

module.exports = router;
