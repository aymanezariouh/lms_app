import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre de la ressource est obligatoire"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["video", "article", "pdf", "link"],
      required: [true, "Le type de ressource est obligatoire"],
    },
    url: {
      type: String,
      required: [true, "L'URL du contenu est obligatoire"],
      trim: true,
    },
    duration: {
      type: Number, // En minutes (utile pour les vidéos/articles)
      default: 0,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "La ressource doit être rattachée à un module"],
    },
  },
  {
    timestamps: true,
  },
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
