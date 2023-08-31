const mongoose = require("mongoose");

const recInfosSchema = mongoose.Schema({
  animalName: { type: String, required: true },
  ownerName: { type: String, required: true },
  date: { type: String, required: true },
  localisation: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mail: { type: String, required: true },
  why: { type: String, required: true },
  category: { type: String, default: "rec" },
  confirmed: { type: Boolean, default: false },
  confirmedPaiement: { type: Boolean, default: false },
  pastAppointment: { type: Boolean, default: false },
});

module.exports = mongoose.model("RecInfos", recInfosSchema);
