import { MessageDTO } from "../dto/message.dto";
import messageRepository from "../repositories/message.repository";
import userRepository from "../repositories/user.repository";

export async function getMessages(userId: string, userId2: string): Promise<MessageDTO[]> {
    return await messageRepository.getMessagesBetweenFriends(userId, userId2);
}

export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<MessageDTO> {
    const newMessage = await messageRepository.sendMessage(senderId, receiverId, content);

    const receiver = await userRepository.getUser(newMessage.senderId);
    newMessage.receiverName = `${receiver.firstName} ${receiver.lastName}`;
    return newMessage;
}

export async function correctionMsg(msgId: string, correctedMsg: string) {
    return await messageRepository.correctedMsg(msgId, correctedMsg);
}