import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  liked_outfits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfit",
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
