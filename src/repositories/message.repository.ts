import Message from "../models/message.model"

const messageRepository = {
    getMessagesBetweenFriends: async (userId: string, userId2: string) => {
        const messages = await Message.find({
            $or: [
                { sender_id: userId, receiver_id: userId2 },
                { sender_id: userId2, receiver_id: userId },
            ]
        }).sort({ timestamp: 1 })
        return messages;
    }
}

export default messageRepository;