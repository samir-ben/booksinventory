import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  unitPurchaseHtPrice: {
    type: String
  },
  unitRetailHtPrice: {
    type: String
  },
  discount: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
  category: {
    type: String
  },
  condition: {
    type: String
  },
});

export default mongoose.model("Book", Book);
