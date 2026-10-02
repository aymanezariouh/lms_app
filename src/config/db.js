import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("conected");
  } catch (error) {
    console.error(" Erreur connexion MongoDB :", error.message);
    process.exit(1);
  }
};
export default connectDB;
