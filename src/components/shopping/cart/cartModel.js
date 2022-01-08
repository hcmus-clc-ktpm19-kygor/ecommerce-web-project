const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const cartSchema = new Schema(
  {
    // Schema attributes are defined here
    guest_id: String,
    user_id: ObjectId,
    products: Array,
  },
  { timestamps: true, versionKey: false }
);

// Create order model in db
module.exports = mongoose.model("cart", cartSchema, "cart");
