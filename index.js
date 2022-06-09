require("dotenv").config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";

const app = express();

//Application Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

//configs
import routeConfig from "./config/route.config";

//DataBase connection
import ConnectDB from "./database/connection";

//Microservices Routes
import Auth from "./API/Authentication/index";
import Projects from "./API/Project/index";
import photos from "./API/Gallery/index";
import Events from "./API/Events/index";
import Brochure from "./API/Brochure/brochure";
import Slider from "./API/slider";
import Achievememts from "./API/Achievements/index";
import Faculty from "./API/Faculty/index";
import PgStudents from "./API/PGStudents/index";
import User from "./API/User/index";
import Feedback from "./API/Feedback/index";
import Payment from "./API/Payments/index";

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//passport configuration
routeConfig(passport);

//Application Routes
app.use("/auth", Auth);
app.use("/projects", Projects);
app.use("/photos", photos);
app.use("/events", Events);
app.use("/brochure", Brochure);
app.use("/faculty", Faculty);
app.use("/pg", PgStudents);
app.use("/slider", Slider);
app.use("/achievements", Achievememts);
app.use("/user", User);
app.use("/feedback", Feedback)
app.use("/payment", Payment);


app.get("/add", passport.authenticate("jwt"), async (req, res) => {
    try {
      console.log(req.session.passport.user);
      return res.json({message: "ADD"});
    }
    catch(e) {
    }
}) 

app.listen(4000, () =>
    // console.log("server")
    ConnectDB()
    .then(() => console.log("Server is running \n DB connected"))
    .catch(() => console.log("Server is running DB didnt connected"))
);
