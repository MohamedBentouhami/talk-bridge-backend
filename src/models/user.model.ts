import mongoose from "mongoose";
import { Languages } from "../@types/languages.enum";
import { IUser } from "../@types/user.interface";

  
const userSchema = new mongoose.Schema<IUser>({
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
    },
    profile_pict: {
        type: String,
        default: "default-pict.png" 
    }

}, {
    timestamps: true
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;