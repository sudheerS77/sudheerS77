import mongoose from "mongoose";

const VisitingFacultySchema = new mongoose.Schema(
    {
        name: { type: String },        
        position: { type: String },
        image: [
            { type: String }
        ],
        degree: {type: String},
        status: { type: String },
    }
);

export const VisitingFacultyModel = mongoose.model("visitingFaculty", VisitingFacultySchema);