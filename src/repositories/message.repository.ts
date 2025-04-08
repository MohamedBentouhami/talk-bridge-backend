import { IMessage } from "../@types/message.interface";
import Message from "../models/message.model"

const messageRepository = {
    getMessagesBetweenFriends: async (userId: string, userId2: string) : Promise<IMessage[]> => {
        const messages = await Message.find({
            $or: [
                { sender_id: userId, receiver_id: userId2 },
                { sender_id: userId2, receiver_id: userId },
            ]
        }).sort({ timestamp: 1 })
        return messages;
    },
    sendMessage: async (senderId: string, receiverId: string, content: string) => {
        const msg = new Message({
            sender_id: senderId,
            receiver_id: receiverId,
            content
        })

        await msg.save();
    }

}

export default messageRepository;