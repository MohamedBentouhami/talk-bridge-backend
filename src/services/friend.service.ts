import { statusFriendship } from "../@types/status-friendship.enum";
import friendshipRepository from "../repositories/friend.repository";

export async function addFriend(userId: string, friendId: string) {
    await friendshipRepository.addFriend(userId, friendId);
}
export async function handleFriendshipRequest(userId: string, friendId: string, status: statusFriendship): Promise<void> {
    if(status === statusFriendship.accepted){
        await friendshipRepository.acceptFriendshipRequest(userId, friendId);
    }
    if(status === statusFriendship.refused){
        await friendshipRepository.refuseFriendshipRequest(userId, friendId);
    }
}

export async function friendshipAlreadyExist(userId: string, friendId: string): Promise<boolean>{
    return friendshipRepository.friendshipAlreadyExist(userId, friendId);
}
export async function getNewRequesters(userId: string){
    return friendshipRepository.getNewRequesters(userId);
}

