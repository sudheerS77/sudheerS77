import mongoose from "mongoose";

const BrochureSchema = new mongoose.Schema(
    {
        name: { type: String },   
        image: { type: String },
        url: [
            {
                type: String
            }
        ],
        status: { type: String }
    }
);

export const BrochureModel = mongoose.model("brochure", BrochureSchema);