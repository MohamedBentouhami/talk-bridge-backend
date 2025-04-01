import { ObjectId } from "mongoose";

export interface IMessage {
    _id: string,
    sender_id: ObjectId,
    receiver_id: ObjectId,
    content: string,
    createdAt?: Date;
}