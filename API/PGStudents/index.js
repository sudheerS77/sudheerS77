import express from "express";

//Models
import { PGModel }  from "../../database/department/pgStudetns";

const Router = express.Router();

/*
ROUTE       :   /pg
DESCRIPTION :   get all pg-Students data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {
        const pg = await PGModel.find({});
        res.json({ pg });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /get-pg
DESCRIPTION :   get Faculty based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get-pg/:_id", async (req, res) => {
    try {
        const pg = await PGModel.findById(req.params);
        return res.json({ pg });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /add-pg
DESCRIPTION :   upload pg-Students data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/add-pg", async (req, res) => {
    try {
        const isAvailable = await PGModel.findOne(req.body.pgData);
        if(isAvailable) {
            throw Error("Pg-student already exist");
        }
        const data = await req.body.pgData;
        await PGModel.create(data);

        res.json({ data });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /update-pg
DESCRIPTION :   update pg data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-pg", async (req, res) => {
    try {
        const data = req.body.pgData;
        await PGModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "PG-Student updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /delete-pg
DESCRIPTION :   delete Faculty based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete-pg/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await PGModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        await PGModel.findByIdAndDelete(_id);
        res.status(200).json({message: "PG Student Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



export default Router;