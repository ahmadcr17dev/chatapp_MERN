import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 7,
        maxlength: 15
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "custom"]
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    profilepic: {
        type: String,
        required: true,
        default: ""
    }
}, {timestamps: true});

export const User = mongoose.model("User", UserSchema);
export default User;