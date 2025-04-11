import { statusFriendship } from "../@types/status-friendship.enum";
import { FriendDTO } from "../dto/friend.dto";
import friendshipRepository from "../repositories/friend.repository";

export async function addFriend(userId: string, friendId: string): Promise<string> {
    return await friendshipRepository.addFriend(userId, friendId);
}
export async function acceptFriendshipRequest(userId: string, friendId: string): Promise<FriendDTO> {
    return await friendshipRepository.acceptFriendshipRequest(userId, friendId);
}
export async function refuseFriendshipRequest(userId: string, friendId: string): Promise<void> {
    console.log("test")
    await friendshipRepository.refuseFriendshipRequest(userId, friendId);

}

export async function friendshipAlreadyExist(userId: string, friendId: string): Promise<boolean> {
    return friendshipRepository.friendshipAlreadyExist(userId, friendId);
}
export async function getNewRequesters(userId: string) {
    return friendshipRepository.getNewRequesters(userId);
}
export async function getNewRequester(friendshipId: string) {
    return friendshipRepository.getRequester(friendshipId);
}

