import mongoose from "mongoose";

const AchievememtSchema = new mongoose.Schema(
    {
      userType: { type: String },
      name: { type: String },
      image: [
        {  type: String }   
      ],
      description: [
        {  type: String }           
      ],
      degree: { type: String },
      position: { type: String },
      status: { type: String },
    }
);

export const AchievememtModel = mongoose.model("achievements", AchievememtSchema);