import mongoose from "mongoose";

const FacultyFeedbackSchema = new mongoose.Schema(
    {
        name: { type: String },
        degree: { type: String },
        position: { type: String },
        image: [
            { type: String }
        ],
        feedback_status: { type: String },
          
    }
);


export const FacultyFeedbackModel = mongoose.model("facultyFeedback", FacultyFeedbackSchema);