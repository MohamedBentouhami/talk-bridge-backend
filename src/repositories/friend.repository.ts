import { statusFriendship } from "../@types/status-friendship.enum";
import { FriendDTO } from "../dto/friend.dto";
import { RequesterDTO } from "../dto/requester.dto";
import Friendship from "../models/friendship.model";

const friendshipRepository = {
    getAllFriends: async (userId: string) => {
        const friends = await Friendship.find({ user_id: userId }).populate('friend_id');
        return friends.map((friend) => new FriendDTO(friend));
    },
    addFriend: async (userId: string, friendId: string) => {
        const friendship = new Friendship({
            user_id: userId,
            friend_id: friendId,
            status: statusFriendship.isPending
        })
        const friendship2 = new Friendship({
            user_id: friendId,
            friend_id: userId,
            status: statusFriendship.isPending
        })
        await friendship2.save();
        await friendship.save();
    },
    friendshipAlreadyExist: async (userId: string, friendId: string) => {
        const friendShip = await Friendship.find({ user_id: userId, friend_id: friendId });
        return friendShip.length > 0;
    },
    handleFriendshipRequest: async (userId: string, friendId: string, friendshipStatus: statusFriendship) => {
        await Friendship.updateOne({ user_id: userId }, { status: friendshipStatus });
        await Friendship.updateOne({ user_id: friendId }, { status: friendshipStatus });
    },
    getNewRequesters: async (userId: string) => {
        const newRequesters = await Friendship.find({ friend_id: userId, status: statusFriendship.isPending }).populate('user_id');
        console.log(newRequesters);
        return  newRequesters.map((newRequester) => new RequesterDTO(newRequester));
    }




}

export default friendshipRepository;