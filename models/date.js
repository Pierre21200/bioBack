const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  date: { type: String, required: true },
  free: { type: Boolean },
});

module.exports = mongoose.model("Mydate", dateSchema);
