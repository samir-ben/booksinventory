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
  price: {
    type: String
  },
  discount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Book", Book);
