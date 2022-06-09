import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
    {
        faculty_id: { type: String },
        name: { type: String },
        email: { type: String },
        affiliation: { type: String },
        designation: { type: String },
        phoneNumber: { type: Number },
        rating: { type: String },
        topicRating: { type: String },
        feedback: { type: String },
        suggestion: { type: String },
        status: { type: String }
    }
);

export const FeedbackModel = mongoose.model("feedback", FeedbackSchema);