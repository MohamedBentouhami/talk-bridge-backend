import messageRepository from "../repositories/message.repository";

export async function getMessages(userId: string, userId2: string) {
    console.log(userId, userId2);
    return await messageRepository.getMessagesBetweenFriends(userId, userId2);
}

export async function sendMessage(senderId: string,  receiverId: string, content: string){
    await messageRepository.sendMessage(senderId, receiverId, content);
}