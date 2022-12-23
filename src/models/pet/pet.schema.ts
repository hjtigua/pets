import mongoose, { Schema } from "mongoose";

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    message: "{VALUE} is not supported",
    required: true,
  },
  birthDay: { type: Date, required: true },
  race: {
    name: { type: String, required: true },
    size: { type: String, required: true },
  },
});

export const Pet = mongoose.model("Pet", petSchema);
