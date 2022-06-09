import express from "express";

//Models
import  { ProjectModel }  from "../../database/projects/index";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all Projects
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/

Router.get("/", async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        return res.json({ projects });
    } catch (error) {
        res.status(500).json({error: error.message});
    }    
});


/*
ROUTE       :   /_id
DESCRIPTION :   get Project based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const projects = await ProjectModel.findById(req.params);
        return res.json({ projects });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /add-project
DESCRIPTION :   upload Project data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/add-project", async(req, res) => {
    try {
        const data = await req.body.projectData;
        const projectData = await ProjectModel.create(data);
        return res.status(200).json({projectData});
    } catch (error) {
        returnres.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /update-project
DESCRIPTION :   update project data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-project", async (req, res) => {
    try {
        const data = req.body.projectData;
        await ProjectModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Project updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /delete
DESCRIPTION :   delete Project based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await ProjectModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Project Not exist");
        }
        const data = await ProjectModel.findByIdAndDelete(_id);
        res.status(200).json({data: data, message: "Project Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


export default Router;