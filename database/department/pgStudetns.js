import mongoose from "mongoose";

const PgStudentsSchema = new mongoose.Schema(
    {
        name: { type: String },
        deg: { type: String },
        description: [
            {
                type: String
            }
        ],
        image: [
            { type: String }
        ],
        year: { type: String },
        status: { type: String },
    }
);

export const PGModel = mongoose.model("pgstudents", PgStudentsSchema);