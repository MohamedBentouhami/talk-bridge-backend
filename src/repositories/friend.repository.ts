import { statusFriendship } from "../@types/status-friendship.enum";
import { FriendDTO } from "../dto/friend.dto";
import { RequesterDTO } from "../dto/requester.dto";
import Friendship from "../models/friendship.model";
import { friendshipAlreadyExist } from "../services/friend.service";

const friendshipRepository = {
    getAllFriends: async (userId: string) => {
        const friends = await Friendship.find({ user_id: userId, status: statusFriendship.accepted }).populate('friend_id');
        return friends.map((friend) => new FriendDTO(friend));
    },
    addFriend: async (userId: string, friendId: string) => {
        const friendship = new Friendship({
            user_id: userId,
            friend_id: friendId,
            status: statusFriendship.isPending
        })
        await friendship.save();
    },
    friendshipAlreadyExist: async (userId: string, friendId: string) => {
        const friendShip = await Friendship.find({ user_id: userId, friend_id: friendId });
        return friendShip.length > 0;
    },
    acceptFriendshipRequest: async (userId: string, friendId: string) => {
        await Friendship.updateOne({ user_id: friendId , friend_id: userId}, { status: statusFriendship.accepted });
        await Friendship.findOneAndUpdate({ user_id: userId, friend_id: friendId }, { status: statusFriendship.accepted }, {upsert: true});
    },
    refuseFriendshipRequest: async (userId: string, friendId: string) => {
        await Friendship.findOneAndDelete({ user_id: userId }, { friend_id: friendId });
        await Friendship.findOneAndDelete({ user_id: friendId }, { status: userId });
    },
    getNewRequesters: async (userId: string) => {
        const newRequesters = await Friendship.find({ friend_id: userId, status: statusFriendship.isPending }).populate('user_id');
        return newRequesters.map((newRequester) => new RequesterDTO(newRequester));
    }




}

export default friendshipRepository;