const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    foundedOn: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);