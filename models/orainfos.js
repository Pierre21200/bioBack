const mongoose = require("mongoose");

const oraInfosSchema = mongoose.Schema({
  imageUrl: { type: String, required: true },
  animalName: { type: String, required: true },
  ownerName: { type: String, required: true },
  why: { type: String, required: true },
  date: { type: String, required: true },
  mail: { type: String, required: true },
  category: { type: String, default: "ora" },
  confirmed: { type: Boolean, default: false },
  confirmedPaiement: { type: Boolean, default: false },
  pastAppointment: { type: Boolean, default: false },
});

module.exports = mongoose.model("OraInfos", oraInfosSchema);
