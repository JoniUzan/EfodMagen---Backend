const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true
    }
  },
  notes: {
    type: String,
    required: true,
  },
  accessibility: {
    type: Boolean,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  contact_name_and_phone_number: {
    type: String,
    required: true,
  },
});

// Create a 2dsphere index on the location field
shelterSchema.index({ location: '2dsphere' });

const Shelter = mongoose.model("Shelter", shelterSchema);
module.exports = Shelter;