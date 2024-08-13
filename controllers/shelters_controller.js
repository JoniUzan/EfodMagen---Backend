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

async function findClosestShelters(req, res) {
  const { lat, lng } = req.query;
  console.log(lat, lng);

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude are required" });
  }

  try {
    const shelters = await Shelter.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // [longitude, latitude]
          },
        },
      },
    }).limit(5);

    res.status(200).json(shelters);
  } catch (err) {
    console.error(`Error in findClosestShelters: ${err.message}`);
    res
      .status(500)
      .json({ message: "Server error while fetching closest shelters" });
  }
}

async function getUserShelters(req, res) {
  const userId = req.userId; // Extracted from the token by verifyToken middleware

  try {
    // Find the user by ID and populate the saved_shelters field
    const user = await User.findById(userId).populate("saved_shelters");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated shelters
    return res.status(200).json(user.saved_shelters);
  } catch (error) {
    console.error("getUserShelters: Error fetching user's shelters", error);
    return res.status(500).json({ message: "Server error", error });
  }
}

async function saveShelterToUser(req, res) {
  const { shelterId } = req.body; // Extract shelterId from the request body
  const userId = req.userId; // Extract userId from the verified token (assuming verifyToken middleware is used)

  try {
    // Find the shelter by ID to ensure it exists
    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the shelter is already in the user's saved shelters
    const shelterIndex = user.saved_shelters.indexOf(shelterId);

    if (shelterIndex !== -1) {
      // If shelterId exists in the array, remove it
      user.saved_shelters.splice(shelterIndex, 1);
      await user.save();
      return res
        .status(200)
        .json({
          message: "Shelter removed successfully",
          saved_shelters: user.saved_shelters,
        });
    } else {
      // If shelterId does not exist in the array, add it
      user.saved_shelters.push(shelterId);
      await user.save();
      return res
        .status(200)
        .json({
          message: "Shelter saved successfully",
          saved_shelters: user.saved_shelters,
        });
    }
  } catch (error) {
    console.error(
      "saveShelterToUser: Error saving or removing shelter to/from user",
      error
    );
    return res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  findShelter,
  deleteShelterkById,
  updateShelter,
  createShelter,
  findClosestShelters,
  getUserShelters,
  saveShelterToUser,
};
