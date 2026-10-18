import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre du module est obligatoire"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: [true, "L'ordre du module est obligatoire"],
      default: 1,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Le module doit être rattaché à un cours"],
    },
  },
  {
    timestamps: true,
  },
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;
