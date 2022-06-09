import express from "express";

//Models
import { SliderModel } from "../database/department/slider";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all slider images
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {
        const data = await SliderModel.find({});
        res.json({ data })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /get/_id
DESCRIPTION :   get slider based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const data = await SliderModel.findById(req.params);
        return res.json({ data });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /add-slider
DESCRIPTION :   upload slider images
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-slider", async (req, res) => {
    try {
        const data = await req.body.sliderData;
        console.log(data);
        await SliderModel.create(data)
        //res.json({ photos })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /update-slider
DESCRIPTION :   update slider data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-slider", async (req, res) => {
    try {
        const data = req.body.sliderData;
        await SliderModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Slider updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /delete
DESCRIPTION :   delete Slider based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await SliderModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        const data = await SliderModel.findByIdAndDelete(_id);
        console.log(data);
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
export default Router;