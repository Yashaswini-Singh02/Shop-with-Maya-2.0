import mongoose from "mongoose";

const OutfitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  garment_zone: {
    type: String,
    enum: ["upper_body", "lower_body"],
    required: true,
  },
  liked_by: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Outfit = mongoose.model("Outfit", OutfitSchema);
