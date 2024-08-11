  const mongoose = require("mongoose");

  //const todoSchema = new mongoose.Schema({
    //  title: { type: String, required: true },
      //isComplete: { type: Boolean, default: false },
  //});

  const shelterSchema = new mongoose.Schema({
      //title: { type: String, required: true },
      //description: { type: String, required: true },
      //body: { type: String, required: true },
      //todoList: [todoSchema],
      //isPinned: { type: Boolean, default: false },
      //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

          address: {
              type: String,
              required: true
          },
          capacity: {
              type: Number,
              required: true
          },
          coordinates: {
              latitude: {
                  type: Number,
                  required: true
              },
              longitude: {
                  type: Number,
                  required: true
              }
          },
          notes: {
              type: String,
              required: true
          },
          accessibility: {
              type: Boolean,
              required: true
          },


    //   isPrivate: {type:Boolean, required:true},
    //   contact: {type:String, required:true},

  });

  const Shelter = mongoose.model("Shelter", shelterSchema);
  module.exports = Shelter;