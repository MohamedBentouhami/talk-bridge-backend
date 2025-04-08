import { statusFriendship } from "../@types/status-friendship.enum";
import { FriendDTO } from "../dto/friend.dto";
import { RequesterDTO } from "../dto/requester.dto";
import Friendship from "../models/friendship.model";

const friendshipRepository = {
    getAllFriends: async (userId: string) => {
        const friends = await Friendship.find({ user_id: userId, status: statusFriendship.accepted }).populate('friend_id');
        return friends.map((friend) => new FriendDTO(friend));
    },
    addFriend: async (userId: string, friendId: string): Promise<string> => {
        const friendship = new Friendship({
            user_id: userId,
            friend_id: friendId,
            status: statusFriendship.isPending
        })
        await friendship.save();
        return friendship._id.toString();
    },
    friendshipAlreadyExist: async (userId: string, friendId: string) => {
        const friendShip = await Friendship.find({ user_id: friendId, friend_id: userId });
        return friendShip.length > 0;
    },
    acceptFriendshipRequest: async (userId: string, friendId: string) => {
        await Friendship.findOneAndUpdate({ user_id: userId, friend_id: friendId }, { status: statusFriendship.accepted }, { upsert: true });
        const newFriend = await Friendship.findOneAndUpdate({ user_id: friendId, friend_id: userId }, { status: statusFriendship.accepted }, { new: true }).populate('friend_id');
        return new FriendDTO(newFriend);
    },
    refuseFriendshipRequest: async (userId: string, friendId: string) => {
        console.log(userId, friendId);
        await Friendship.findOneAndDelete({ user_id: userId }, { friend_id: friendId });
        await Friendship.findOneAndDelete({ user_id: friendId }, { status: userId });
    },
    getNewRequesters: async (userId: string) => {
        const newRequesters = await Friendship.find({ friend_id: userId, status: statusFriendship.isPending }).populate('user_id');
        return newRequesters.map((newRequester) => new RequesterDTO(newRequester));
    },
    getRequester: async (friendShipId: string) => {
        const requester = await Friendship.findOne({ _id: friendShipId, }).populate('user_id');
        return new RequesterDTO(requester);
    },


}

export default friendshipRepository;