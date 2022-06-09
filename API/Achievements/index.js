import express from "express";

//Models
import { AchievememtModel }  from "../../database/Achievements/index";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all Achievememts
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {
        const achievememts = await AchievememtModel.find({});
        return res.json({ achievememts });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /_id
DESCRIPTION :   get Achievememts based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const achievememts = await AchievememtModel.findById(req.params);
        return res.json({ achievememts });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /add-achievemnts
DESCRIPTION :   upload achievemnts data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/add-achievements", async (req, res) => {
    try {
        const isAvailable = await AchievememtModel.findOne(req.body.achievememtData);
        if(isAvailable) {
            throw Error("Achievement already exist");
        }
        const data = await req.body.achievememtData;
        await AchievememtModel.create(data);

        res.status(200).json({message: "Achievement add successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /update-achievements
DESCRIPTION :   update achievemnts data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-achievement", async (req, res) => {
    try {
        const data = req.body.achievememtData;
        console.log(data);        
        await AchievememtModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Achievement updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /delete-achievement
DESCRIPTION :   delete achievement based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await AchievememtModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        const data = await AchievememtModel.findByIdAndDelete(_id);
        res.status(200).json({message: "Achievement Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default Router;