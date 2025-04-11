import mongoose from "mongoose";
import { IMessage } from "../@types/message.interface";


const messageSchema = new mongoose.Schema<IMessage>({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    has_been_corrected:{
        type: Boolean,
        default: false
    },
    correction_provided:{
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;