import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
    {
        imageType : { type: String },
        image: { type: String },
        status: { type: String }
    }
);

export const SliderModel = mongoose.model("slider", SliderSchema);