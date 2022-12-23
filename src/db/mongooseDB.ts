import mongoose from "mongoose";

export const mongoConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27018/petsdb");
  } catch (error) {
    console.log(error);
  }
};
