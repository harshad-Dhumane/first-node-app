import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false

    }

});

export const User = mongoose.model("User", userSchema);

