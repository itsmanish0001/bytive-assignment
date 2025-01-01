import mongoose from "mongoose";

const dbConnect = async () => {
    try {
      await mongoose.connect(`${process.env.DB}/bytive`);
      console.log("Database connected");
    } catch (error) {
      console.error("Problem in connecting to DB:", error.message);
    }
  };
  

export {dbConnect}