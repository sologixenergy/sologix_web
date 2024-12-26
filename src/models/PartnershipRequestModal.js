const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    adhar: { type: String, trim: true, required: true },
    pan: { type: String, trim: true, required: true },
    intrestedIn: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const PartnerModal = mongoose.model("partner", PartnerSchema);
module.exports = PartnerModal;
