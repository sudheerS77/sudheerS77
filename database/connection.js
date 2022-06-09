import mongoose from "mongoose";

export default async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        //useNewUrlParser: true, 
        //useUnifiedTopology: true 
    })
}