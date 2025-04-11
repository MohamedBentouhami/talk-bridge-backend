import { MessageDTO } from "../dto/message.dto";
import messageRepository from "../repositories/message.repository";

export async function getMessages(userId: string, userId2: string): Promise<MessageDTO[]> {
    return await messageRepository.getMessagesBetweenFriends(userId, userId2);
}

export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<MessageDTO> {
    return await messageRepository.sendMessage(senderId, receiverId, content);
}

export async function correctionMsg(msgId: string, correctedMsg: string) {
    return await messageRepository.correctedMsg(msgId, correctedMsg);
}