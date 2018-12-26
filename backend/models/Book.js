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
  quantity: {
    type: Number,
    default: 1
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: String
  },
  condition: {
    type: String
  }
});

export default mongoose.model("Book", Book);
