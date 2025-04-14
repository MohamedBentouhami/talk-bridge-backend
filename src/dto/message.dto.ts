import { IMessage } from "../@types/message.interface";

export class MessageDTO {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    hasBeenCorrected : Boolean;
    createdAt?: Date;
    correctionProvided? : string;
    receiverName?: string;
    constructor(message: IMessage) {
        this.id = message._id;
        this.senderId = message.sender_id.toString();
        this.receiverId = message.receiver_id.toString();
        this.content = message.content;
        this.createdAt = message.createdAt;
        this.hasBeenCorrected = message.has_been_corrected;
        this.correctionProvided = message.correction_provided ?? "";
    }
}