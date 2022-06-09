import JwtPassport from "passport-jwt";
import dotenv from "dotenv";

//Database Model
import { UserModel } from "../database/user";

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SRIAUTHAPP",
};

export default (Passport) => {
    Passport.use(new JWTStratergy(options, async(jwt__payload, done) => {
        try {
            const doesUserExist = await UserModel.findById(jwt__payload.user);
            if(!doesUserExist) return done(null, false);

            return done(null, doesUserExist);
        } catch (error) {
            throw new Error(error);
        }
    })
    );
    Passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    Passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}
