/*
  {
    image: url,
    title: string,
    description?: string,
    price: number,
    quantity: number
  }
*/

import mongoose from "mongoose";
import "../products/model";
const { Schema } = mongoose;

export const basketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  favourites: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "https://static.thenounproject.com/png/3454588-200.png",
  },
});

const Basket = mongoose?.models?.Basket || mongoose.model("Basket", basketSchema);
export default Basket;