import mongoose from "mongoose";
import { Languages } from "../@types/languages.enum";

  
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    birthday: {
        type: String,
        required: true,
    },
    native_language: {
        type: String,
        enum: Languages,
        required: true,
    },
    learning_language: {
        type: String,
        enum: Languages,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;