import express from "express";

//Models
import { FeedbackModel } from "../../database/Feedback/index";
import { FacultyFeedbackModel } from "../../database/Feedback/facultyFeedback";


const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all feedback
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
// Router.get("/", async (req, res) => {
//     try {        
//         const data = await FeedbackModel.find({});
//         res.json({ data })
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });

/*
ROUTE       :   /add-user-feedback
DESCRIPTION :   upload user feedback
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-user-feedback", async (req, res) => {
    try {
        const data = req.body.feedbackData;
        console.log(data);
        await FeedbackModel.create(data)
        res.json({ data })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
show the list of faculty in the admin
ROUTE       :   /
DESCRIPTION :   get all Faculty-Feedback list
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/getfacultyfeedbackdata", async (req, res) => {
    try {        
        const feedbackData = await FacultyFeedbackModel.find({});
        return res.status(200).json({ feedbackData });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /_id
DESCRIPTION :   get Faculty based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get-ffaculty/:_id", async (req, res) => {
    try {
        const faculty = await FacultyFeedbackModel.findById(req.params);
        return res.json({ faculty });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /add-faculty-feedback
DESCRIPTION :   upload faculty for feedback
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-faculty-for-feedback", async (req, res) => {
    try {
        const data = await req.body.facultyData;
        console.log(data);
        // const isAvailable = await FacultyFeedbackModel.find({"name": data.name});
        // console.log(isAvailable);
        // if(isAvailable) {
        //     throw Error("Faculty already exist");
        // }
        const ffb = await FacultyFeedbackModel.create(data)
        res.json({ ffb })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /update-feedback-faculty
DESCRIPTION :   update faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-feedack-faculty", async (req, res) => {
    try {
        const data = req.body.facultyData;
        await FacultyFeedbackModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Faculty updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /delete-faculty-feedback
DESCRIPTION :   DELETE faculty and all the feedback given users data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   DELETE
*/

Router.delete("/delete-faculty-feedback/:_id", async (req, res) => {
    try {
        const _id = req.params;
        await FacultyFeedbackModel.findByIdAndDelete(_id);
        await FeedbackModel.deleteMany({ faculty_id: _id });
        res.json({ message: "Deleted Successfully" });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});









/*
show the list of faculty in the admin
ROUTE       :   /
DESCRIPTION :   get all Faculty-Feedback 
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/faculty-feedback/:_id", async (req, res) => {
    try {        
        var excellent = 0
        var good = 0
        var moderate =  0
        var unsatisified = 0
        var poor = 0
        const fdata = await FeedbackModel.find();        
        fdata.map((data) => {
            //console.log(data);
            if(data.faculty_id === req.params._id) {
                if(data.rating === "5") excellent = excellent + 1;
                if(data.rating === "4") good = good + 1;
                if(data.rating === "3") moderate = moderate + 1;
                if(data.rating === "2") unsatisified = unsatisified + 1;
                if(data.rating === "1") poor = poor + 1;
            }
        })
        const rating = [
            excellent,
            good,
            moderate,
            unsatisified,
            poor
        ]
        console.log(rating);
        res.json({ rating })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



export default Router;  