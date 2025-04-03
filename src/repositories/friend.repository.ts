import { statusFriendship } from "../@types/status-friendship.enum";
import Friendship from "../models/friendship.model";

const friendshipRepository = {
    getAllFriends: async (userId: string) => {
        return await Friendship.find({ user_id: userId }).populate('friend_id')
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
        const friendShip = await Friendship.find({user_id : userId , friend_id: friendId});
        return friendShip.length > 0;
    },
    handleFriendshipRequest: async (userId: string, friendId: string, friendshipStatus: statusFriendship) => {
        await Friendship.updateOne({ user_id: userId }, { status: friendshipStatus });
        await Friendship.updateOne({ user_id: friendId }, { status: friendshipStatus });
    }


}

export default friendshipRepository;