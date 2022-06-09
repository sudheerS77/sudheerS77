import mongoose, { mongo } from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        projectName: { type: String },
        image: { type: String },
        description: [
            { type: String }
        ],
        status: { type: String },
    }
);
export const ProjectModel = mongoose.model("Projects", ProjectSchema);