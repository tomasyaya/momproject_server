const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
    quantity: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Order", orderSchema);