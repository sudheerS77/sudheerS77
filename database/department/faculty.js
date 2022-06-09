import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
    {
        name: { type: String },
        degree: { type: String },
        position: { type: String },
        image: [
            { type: String }
        ],
        status: { type: String },

    }
);

export const FacultyModel = mongoose.model("faculty", FacultySchema);