import mongoose, { Schema } from "mongoose";

const petSchema = new Schema({
  name: String,
  gender: String,
  birthDay: Date,
  race: { name: String, size: String },
});

export const Pet = mongoose.model("Pet", petSchema);
