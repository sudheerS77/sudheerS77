import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
    {
        imageType : { type: String },
        images : [
            { type: String }
        ],
    }
);

export const GalleryModel = mongoose.model("gallery", GallerySchema);
