import mongoose from "mongoose";

export const mongoConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const mongoUrl = process.env.MONGO_URL;
    console.log("Iniciando BD", { mongoUrl });
    if (!mongoUrl) throw new Error("Missing mongo url parameter");
    await mongoose.connect(mongoUrl, {
      connectTimeoutMS: 5000,
    });
    console.info("MongoDB connected");
  } catch (error) {
    console.warn("Error on DB");
    console.warn(error);
  }
};
