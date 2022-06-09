import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
    {
        eventName: { type: String },
        subHeading: { type: String},
        description: { type: String },
        specialNotes: { type: String },
        speaker: [ { type: String }, ],
        organiser: [ { type: String }, ],
        eligibility: [ { type: String }, ],
        status: { type: String },
        currentHome: { type: String },
        abstractForm: { type: String },
        registerDate: { type: Date },
        conferenceStartDate: { type: Date },
        conferenceEndDate: { type: Date },
        image: { type: String },
        venues: { type: String },
        conferenceType: { type: String },
        conferenceURL: { type: String }, 
        organizerName: { type: String }, 
        scheduleConference: [
            {
                date: { type: Date },
                startTime: { type: Date },
                endTime: { type: Date },
                topic: { type: Date },
                topicdescription: { type: String },
                speaker: { type: String },
            }
        ]      
        //eventDate: {type: Date, default: Date.now}
    }
);


export const EventModel = mongoose.model("Events", EventsSchema);
