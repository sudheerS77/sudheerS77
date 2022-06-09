import express from "express";
import Razorpay from "razorpay";
import {v4 as uuid} from "uuid";

//Database Modal
import { EventModel } from "../../database/Events";

const Router = express.Router();


Router.post("/new", async (req, res) => {
    try {
        const  instance = new Razorpay({
            key_id: process.env.RZR_PAY_ID,
            key_secret: process.env.RZR_PAY_SECRET
        })
        var options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: `${uuid()}`,
        }
        const data = await instance.orders.create(options);
        return res.json({ data })
    } catch (error ) {
        res.status(500).json({error: error.message});
    }

});

export default Router;