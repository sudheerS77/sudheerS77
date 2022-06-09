import express from "express";

//Models
import { EventModel }  from "../../database/Events/index";
import { EventRegisterModel } from "../../database/Events/eventRegister";
import { UserModel } from "../../database/user/index";

const Router = express.Router();

/*
ROUTE       :   /
DESCRIPTION :   get all Events
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/", async (req, res) => {
    try {
        const events = await EventModel.find({});
        return res.json({ events });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});
/*
ROUTE       :   /_id
DESCRIPTION :   get all Events based on _id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get/:_id", async (req, res) => {
    try {
        const events = await EventModel.findById(req.params);
        return res.json({ events });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /add-event
DESCRIPTION :   add Events
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/add-event", async (req, res) => {
    try {
        const isAvailable = await EventModel.findOne(req.body.eventData);
        if(isAvailable) {
            throw Error("Event already exist");
        }
        const data = await req.body.eventData;
        await EventModel.create(data);
        res.status(200).json({message: "Event add successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /update-event
DESCRIPTION :   update event data
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   PUT
*/
Router.put("/update-event", async (req, res) => {
    try {
        const data = req.body.eventData;
        await EventModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data }
        );
        res.status(200).json({message: "event updated successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/*
ROUTE       :   /delete/:_id
DESCRIPTION :   delete event based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {        
        const _id = req.params;
        const isAvailable = await EventModel.findOne({_id});
        if(!isAvailable) {
            throw Error("Data Not exist");
        }
        const data = await EventModel.findByIdAndDelete(_id);
        return res.status(200).json({message: "Event Deleted successfully", data: data});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// EventRegistration Routes


/*
ROUTE       :   /get-registered-events/:_id
DESCRIPTION :   Get all the registred event based on event id
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/get-registered-events/:_id", async (req, res) => {
    try {
        const data = await EventRegisterModel.find({event_id: req.params});
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


/*
ROUTE       :   /get-registered-events/
DESCRIPTION :   Get all the registred event
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   GET
*/Router.get("/get-faculty/:_id", async (req, res) => {
    try {
        const faculty = await FacultyModel.findById(req.params);
        return res.json({ faculty });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});
Router.get("/getuserevents/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        console.log(id);
        const checking_user_events = await EventRegisterModel.find();
        const userEvents = []
        checking_user_events.map((data) => {
            if(data.user_id === id) {
                userEvents.push(data)
            }
        });
        console.log(userEvents);
        res.status(200).json({ userEvents });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



/*
ROUTE       :   /event-register-user
DESCRIPTION :   register the user for the event
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POSt
*/
Router.post("/event-register-user", async (req, res) => {
    try {
        const data = await req.body.eventRegData;
        //console.log(data);
        //find( { qty: { $gt: 4 } } )
        //const check_event_id = await EventRegisterModel.find({ event_id: { $gt: data.event_id } });
        //const check_user = await EventRegisterModel.find({ event_id: { $gt: data.event_id }, user_id: { $gt: data.user_id }});        
        // const check_user = await EventRegisterModel.find({ $or : [
        //     {"event_id": data.event_id},
        //     {"user_id": data.user_id}
        // ]});
             //event_id: { $gt: data.event_id }, user_id: { $gt: data.user_id }});                
        const event_data = await EventRegisterModel.find();
        event_data.map((e_data) => {
            if (e_data.user_id === data.user_id && e_data.event_id === data.event_id) {
                throw Error("User already Registered for the event");
            }
        })       
        await EventRegisterModel.create(data);
        res.status(200).json({message: "User Registered Successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



export default Router;