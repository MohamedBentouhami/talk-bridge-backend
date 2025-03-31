import mongoose from "mongoose";

export default async function connectDB() {
    const { MONGO_URI } = process.env;
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connection to MongoDB : Success!")
    } catch (error) {
        console.log("Connection to MongoDB : Fail! ")
    }
}