import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String},
        institution: { type: String},
        stateDentalCode: { type: String},
        state: { type: String},
        phoneNumber: [{ type: Number }], 
        typeOfRegistration: { type: String},  
        password: { type: String },
        address: [{ type: String} ],
        //{ detail: { type: String }, for: { type: String } }
        email: { type: String, required: true },
        userRole: { type: String, default: "user" },
        status: { type: String, default: "Active" }
    },
    {
        timestamps: true,
    }
);
UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({ user: this._id.toString() }, "SRIAUTHAPP");
}

UserSchema.statics.findUserByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });    

    if(checkUserByEmail || checkUserByPhone) throw Error("User already exist with email or phone number");

    return false
}

UserSchema.statics.findUserByEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    console.log(user);

    if(!user) throw Error("User Doesn\'t Exist");

    const cmpPassword = await bcrypt.compare(password, user.password);
    console.log(cmpPassword);

    if(!cmpPassword) {        
        throw new Error("Password didnt match");
    }
    return user;
}


UserSchema.pre("save", function(next) {
    const user = this;
    if(!user.isModified("password")) return next();

    //generate salt
    bcrypt.genSalt(8, (error, salt) => {
        if(error) return next(error);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);
            user.password = hash;
            return next();
        })
    })
});

export const UserModel = mongoose.model("Users", UserSchema);