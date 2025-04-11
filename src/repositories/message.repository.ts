import { IMessage } from "../@types/message.interface";
import { MessageDTO } from "../dto/message.dto";
import Message from "../models/message.model"

const messageRepository = {
    getMessagesBetweenFriends: async (userId: string, userId2: string): Promise<MessageDTO[]> => {
        const messages = await Message.find({
            $or: [
                { sender_id: userId, receiver_id: userId2 },
                { sender_id: userId2, receiver_id: userId },
            ]
        }).sort({ timestamp: 1 })
        return messages.map(msg => new MessageDTO(msg));
    },
    sendMessage: async (senderId: string, receiverId: string, content: string): Promise<MessageDTO> => {
        const msg = new Message({
            sender_id: senderId,
            receiver_id: receiverId,
            content
        })

        await msg.save();
        return new MessageDTO(msg);
    },
    correctedMsg: async (msgId: string, correctedMsg: string) => {
        console.log(correctedMsg)
        const updateMsg: IMessage | null = await Message.findByIdAndUpdate(msgId, { has_been_corrected: true, correction_provided: correctedMsg }, { new: true });
        console.log(updateMsg);
        return new MessageDTO(updateMsg!)

    }


}

export default messageRepository;