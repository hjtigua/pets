import mongoose from "mongoose";

export const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27018/petsdb");
    mongoose.set("strictQuery", true);
  } catch (error) {
    console.log(error);
  }
};
