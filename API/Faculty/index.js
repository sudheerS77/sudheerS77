import express from "express";

//Models
import { FacultyModel } from "../../database/department/faculty";
import { VisitingFacultyModel } from "../../database/department/visitingFaculty";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all faculty
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {        
        const data = await FacultyModel.find({});
        res.json({ data })
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
Router.get("/get-faculty/:_id", async (req, res) => {
    try {
        const faculty = await FacultyModel.findById(req.params);
        return res.json({ faculty });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /add-faculty
DESCRIPTION :   upload faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-faculty", async (req, res) => {
    try {
        const isAvailable = await FacultyModel.findOne(req.body.facultyData);
        if(isAvailable) {
            throw Error("Faculty already exist");
        }
        const data = await req.body.facultyData;
        await FacultyModel.create(data)
        res.json({ data: data, message: "Faculty Added successfully" });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /update-faculty
DESCRIPTION :   update faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-faculty", async (req, res) => {
    try {
        const data = req.body.facultyData;
        await FacultyModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Faculty updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /f-delete
DESCRIPTION :   delete Faculty based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete-f/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await FacultyModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        const faculty = await FacultyModel.findByIdAndDelete(_id);
        res.status(200).json({data: faculty, message: "Faculty Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});




/*
ROUTE       :   /visiting-faculty
DESCRIPTION :   get all visiting-faculty
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/visiting-faculty", async (req, res) => {
    try {       
        const data = await VisitingFacultyModel.find({});
        res.json({ data })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /_id
DESCRIPTION :   get Visiting-Faculty based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/getvisiting-faculty/:_id", async (req, res) => {
    try {
        const vfaculty = await VisitingFacultyModel.findById(req.params);
        return res.json({ vfaculty });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /add-faculty
DESCRIPTION :   upload visiting-faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-visiting-faculty", async (req, res) => {
    try {
        const isAvailable = await VisitingFacultyModel.findOne(req.body.facultyData);
        if(isAvailable) {
            throw Error("Visiting Faculty already exist");
        }
        const data = await req.body.facultyData;
        await VisitingFacultyModel.create(data)
        res.json({ data })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /update-visiting-faculty
DESCRIPTION :   update Visiting Faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-visiting-faculty", async (req, res) => {
    try {
        const data = req.body.facultyData;
        await VisitingFacultyModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Visiting Faculty updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /delete-vf
DESCRIPTION :   delete Faculty based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete-vf/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await VisitingFacultyModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        const faculty = await VisitingFacultyModel.findByIdAndDelete(_id);
        res.status(200).json({data: faculty, message: "Visiting Faculty Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default Router;