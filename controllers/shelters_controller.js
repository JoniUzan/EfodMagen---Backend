const Shelter = require("../schemes/shelter_scheme");
const User = require("../schemes/user_scheme");
const mongoose = require("mongoose");

async function findShelter(req, res) {
  console.log("findShelter called"); // Add this line

  try {
    const shelters = await Shelter.find({});

    res.status(200).json(shelters);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `shelters_controller, findShelter. shelters not found with user id: ${userId}`
      );
      return res.status(404).json({ message: "shelters not found" });
    }
    console.log(
      `shelters_contorller, findShelter. Error while getting shelters with user id: ${userId}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

// async function getTaskById(req, res) {
//   const { id } = req.params;
//   try {
//     const task = await Shelter.findById(id);
//     res.status(200).json(task);
//   } catch (err) {
//     if (err.name === "CastError") {
//       console.log(
//         `tasks_controller, getTaskById. Task not found with id: ${id}`
//       );
//       return res.status(404).json({ message: "Task not found" });
//     }
//     console.log(
//       `tasks_controller, getTaskById. Error while getting Task with id: ${id}`,
//       err.name
//     );
//     res.status(500).json({ message: err.message });
//   }
// }

async function deleteShelterkById(req, res) {
  const { id } = req.params;

  try {
    const deletedShelter = await Shelter.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedShelter) {
      console.log(
        `shelters_controller, deleteShelter. shelter not found with id: ${id}`
      );
      return res.status(404).json({ message: "shelter not found" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { shelters: id },
    });
    res.json({ message: "shelter deleted" });
  } catch (err) {
    console.log(
      `shelters_controller, deleteShelter. Error while deleting shelter with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

// Update Product
async function updateShelter(req, res) {
  const { id } = req.params;
  const shelter = req.body;
  console.log(shelter);
  console.log("req user id", req.userId);
  try {
    const updatedShelter = await shelter.replaceOne(
      {
        _id: id,
        user: req.userId,
      },
      shelter,
      { new: true, runValidators: true }
    );

    console.log("updatedShelter", updatedShelter);

    if (!updatedShelter) {
      console.log(
        `shelters_controller, updateShelter. shelter not found with id: ${id}`
      );
      return res.status(404).json({ message: "shelter not found" });
    }

    res.json(updatedShelter);
  } catch (err) {
    console.log(
      `shelters_controller, updateShelter. Error while updating shelter with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      console.log(`shelters_controller, updateShelter. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`shelters_controller, updateShelter. ${err.message}`);
      res.status(500).json({ message: "Server error while updating shelter" });
    }
  }
}

// Create new Product
async function createShelter(req, res) {
  try {
    const newShelter = new Shelter(req.body);
    console.log(req.body);
    newShelter.user = req.userId; // Add the user id to the product
    const savedShelter = await newShelter.save();
    console.log(savedShelter);
    // Update the user's product array
    await User.findByIdAndUpdate(req.userId, {
      $push: { shelters: savedShelter._id }, // Add the product id to the user's products array
    });

    res.status(201).json(savedShelter);
  } catch (err) {
    console.log(
      "shelters_controller, createShelter. Error while creating shelter",
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`shelters_controller, createShelter. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`shelters_controller, createShelter. ${err.message}`);
      res.status(500).json({ message: "Server error while creating shelter" });
    }
  }
}

module.exports = {
  findShelter,
  deleteShelterkById,
  updateShelter,
  createShelter,
};
