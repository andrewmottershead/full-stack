import mongoose from "mongoose";
import db from "@/lib/api-functions/server/db";
const { Schema } = mongoose;

export const designSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        default: "https://static.thenounproject.com/png/4499500-200.png",
    },
});

const Design = mongoose.models.Design || mongoose.model("Design", designSchema);
export default Design;
