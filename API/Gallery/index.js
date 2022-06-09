import express from "express";

//Models
import { GalleryModel } from "../../database/Gallery/index";

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
        const photos = await GalleryModel.find({});
        return res.json({ photos })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /_id
DESCRIPTION :   get all photos based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const photos = await GalleryModel.findById(req.params);
        return res.json({ photos });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});



/*
ROUTE       :   /upload-gallery
DESCRIPTION :   upload project
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-gallery", async (req, res) => {
    try {        
        const data = await req.body.galleryData;
        console.log(data);
        const photos = await GalleryModel.create(data)
        res.json({ photos })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /update-gallery
DESCRIPTION :   update gallery data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-gallery", async (req, res) => {
    try {
        const data = req.body.galleryData;
        await GalleryModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Gallery updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /delete
DESCRIPTION :   delete Photo based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await GalleryModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Photo Not exist");
        }
        const data = await GalleryModel.findByIdAndDelete(_id);
        console.log(data);
        res.status(200).json({message: "Photo Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default Router;