const Shelter = require("../schemes/shelter_scheme");
const shelter = require("../schemes/shelter_scheme");
const User = require("../schemes/user_scheme");
const mongoose = require("mongoose");

// async function getUserTasks(req, res) {
//     const userId = req.userId;

//     try {
//         const objectId = new mongoose.Types.ObjectId(userId);
//         const tasks = await Task.find({ user: objectId });

//         res.status(200).json(tasks);
//     } catch (err) {
//         if (err.name === "CastError") {
//             console.log(
//                 `tasks_controller, getUserTasks. Tasks not found with user id: ${userId}`
//             );
//             return res.status(404).json({ message: "Tasks not found" });
//         }
//         console.log(
//             `tasks_controller, getUserTasks. Error while getting Tasks with user id: ${userId}`,
//             err.name
//         );
//         res.status(500).json({ message: err.message });
//     }
// }

// async function getTaskById(req, res) {
//     const { id } = req.params;
//     try {
//         const task = await Task.findById(id);
//         res.status(200).json(task);
//     } catch (err) {
//         if (err.name === "CastError") {
//             console.log(
//                 `tasks_controller, getTaskById. Task not found with id: ${id}`
//             );
//             return res.status(404).json({ message: "Task not found" });
//         }
//         console.log(
//             `tasks_controller, getTaskById. Error while getting Task with id: ${id}`,
//             err.name
//         );
//         res.status(500).json({ message: err.message });
//     }
// }

// async function deleteTaskById(req, res) {
//     const { id } = req.params;

//     try {
//         const deletedTask = await Task.findOneAndDelete({
//             _id: id,
//             user: req.userId,
//         });

//         if (!deletedTask) {
//             console.log(
//                 `tasks_controller, deleteTask. Task not found with id: ${id}`
//             );
//             return res.status(404).json({ message: "Task not found" });
//         }

//         await User.findByIdAndUpdate(req.userId, {
//             $pull: { tasks: id },
//         });
//         res.json({ message: "Task deleted" });
//     } catch (err) {
//         console.log(
//             `tasks_controller, deleteTask. Error while deleting task with id: ${id}`
//         );
//         res.status(500).json({ message: err.message });
//     }
// }

// // Update Product
// async function updateTask(req, res) {
//     const { id } = req.params;
//     const task = req.body;
//     console.log(task);
//     console.log("req user id", req.userId);
//     try {
//         const updatedTask = await Task.replaceOne(
//             {
//                 _id: id,
//                 user: req.userId,
//             },
//             task,
//             { new: true, runValidators: true }
//         );

//         console.log("updatedTask", updatedTask);

//         if (!updatedTask) {
//             console.log(`tasks_controller, updateTask. Task not found with id: ${id}`);
//             return res.status(404).json({ message: "Task not found" });
//         }

//         res.json(updatedTask);
//     } catch (err) {
//         console.log(
//             `tasks_controller, updateTask. Error while updating Task with id: ${id}`,
//             err
//         );

//         if (err.name === "ValidationError") {
//             console.log(`ttasks_controller, updateTask. ${err.message}`);
//             res.status(400).json({ message: err.message });
//         } else {

//             console.log(`tasks_controller, updateTask. ${err.message}`);
//             res.status(500).json({ message: "Server error while updating task" });
//         }
//     }
// }

// // Create new Product
// async function createTask(req, res) {
//     try {
//         const newTask = new Task(req.body);
//         console.log(req.body);
//         newTask.user = req.userId; // Add the user id to the product
//         const savedTask = await newTask.save();
//         console.log(savedTask);
//         // Update the user's product array
//         await User.findByIdAndUpdate(req.userId, {
//             $push: { tasks: savedTask._id }, // Add the product id to the user's products array
//         });

//         res.status(201).json(savedTask);
//     } catch (err) {
//         console.log("tasks_controller, createTask. Error while creating task", err);

//         if (err.name === "ValidationError") {
//             // Mongoose validation error
//             console.log(`tasks_controller, createTask. ${err.message}`);
//             res.status(400).json({ message: err.message });
//         } else {
//             // Other types of errors
//             console.log(`tasks_controller, createTask. ${err.message}`);
//             res.status(500).json({ message: "Server error while creating task" });
//         }
//     }
// }

// module.exports = { getUserTasks, deleteTaskById, updateTask, createTask, getTaskById };

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

async function getTaskById(req, res) {
  const { id } = req.params;
  try {
    const task = await Shelter.findById(id);
    res.status(200).json(task);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `tasks_controller, getTaskById. Task not found with id: ${id}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(
      `tasks_controller, getTaskById. Error while getting Task with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

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
  const task = req.body;
  console.log(shelter);
  console.log("req user id", req.userId);
  try {
    const updatedShelter = await shelter.replaceOne(
      {
        _id: id,
        user: req.userId,
      },
      task,
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
