import express from "express";

//Models
import { FacultyModel } from "../../database/department/faculty";
import { VisitingFacultyModel } from "../../database/department/visitingFaculty";
import { PGModel }  from "../../database/department/pgStudetns";

const Router = express.Router();

/*
ROUTE       :   /faculty
DESCRIPTION :   get all faculty
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/faculty", async (req, res) => {
    try {        
        const data = await FacultyModel.find({});
        res.json({ data })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /upload-faculty
DESCRIPTION :   upload faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/upload-faculty", async (req, res) => {
    try {
        const isAvailable = await FacultyModel.findOne(req.body.facultyData);
        if(isAvailable) {
            throw Error("Faculty already exist");
        }
        const data = await req.body.facultyData;
        await FacultyModel.create(data)
        res.json({ data })
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
ROUTE       :   /upload-faculty
DESCRIPTION :   upload visiting-faculty data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/upload-visiting-faculty", async (req, res) => {
    try {
        const isAvailable = await VisitingFacultyModel.findOne(req.body.visitingFacultyData);
        if(isAvailable) {
            throw Error("Visiting Faculty already exist");
        }
        const data = await req.body.visitingFacultyData;
        await VisitingFacultyModel.create(data)
        //res.json({ photos })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /pg
DESCRIPTION :   get all pg-Students data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/pg", async (req, res) => {
    try {
        const data = await PGModel.find({});
        res.json({ data });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /upload-pg
DESCRIPTION :   upload pg-Students data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/upload-pg", async (req, res) => {
    try {
        const isAvailable = await PGModel.findOne(req.body.pgData);
        if(isAvailable) {
            throw Error("student already exist");
        }
        const data = await req.body.pgData;
        await PGModel.create(data);

        res.json({ data });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default Router;