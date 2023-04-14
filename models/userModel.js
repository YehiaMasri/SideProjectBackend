import mongoose from "mongoose";

const {Schema, model} = mongoose;
 
const validateEmail= function(email){
    const em= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return em.test(email);
};

const userSchema = new Schema(
    {
        fullName: {
            type : String,
            require:true
        },
        phoneNumber:{
            type: String,
            require:true,
            min:6,
            max:10,
        },
        address:{
            type:String,
            require:true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: "Email address is required",
            validate: [validateEmail, "Please fill a valid email address"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
            enum: ["admin", "user"],
        },
    },
    {
        collection:"Users",
        timestamps:true,
    }
);

const User = model("User", userSchema);
export default User; 