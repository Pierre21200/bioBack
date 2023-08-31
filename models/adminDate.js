const mongoose = require("mongoose");

const admindateSchema = mongoose.Schema({
  date: { type: String, required: true },
});

module.exports = mongoose.model("Admindate", admindateSchema);
