import mongoose from "mongoose";
import { statusFriendship } from "../@types/status-friendship.enum";


const friendshipSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        friend_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: statusFriendship }
    }
    , { timestamps: true });

const Friendship = mongoose.model('Friendship', friendshipSchema);
export default Friendship;