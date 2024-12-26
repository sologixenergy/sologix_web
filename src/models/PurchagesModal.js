const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchesSchema = new Schema(
  {
    productData: { type: Object, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    instamentOne: { type: Object, required: true },
    instamentTwo: { type: Object, required: false },
    instamentThree: { type: Object, required: false },
    instamentFour: { type: Object, required: false },
  },
  { timestamps: true }
);

const PurchesModal = mongoose.model("purches", PurchesSchema);
module.exports = PurchesModal;
