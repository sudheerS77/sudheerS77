import express from "express";

//Models
import { BrochureModel }  from "../../database/department/brochure";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all Brouchers
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {
        const data = await BrochureModel.find({});
        res.json({ data });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /_id
DESCRIPTION :   get all Brochure based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const brochure = await BrochureModel.findById(req.params);
        console.log(brochure);
        return res.json({ brochure });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});




/*
ROUTE       :   /add-broucher
DESCRIPTION :   add Brochure 
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.post("/add-brochure", async (req, res) => {
    try {
        const data = await req.body.brochureData;
        await BrochureModel.create(data);

        //res.json({  });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /update-brochure
DESCRIPTION :   update brochure data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-brochure", async (req, res) => {
    try {
        const data = req.body.brochureData;
        await BrochureModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "Brochure updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /delete
DESCRIPTION :   delete brochure based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await BrochureModel.findById(_id);
        if(!isAvailable) {
            throw Error("Brochure Not exist");
        }
        const data = await BrochureModel.findByIdAndDelete(_id);
        res.status(200).json({message: "Brochure Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default Router;