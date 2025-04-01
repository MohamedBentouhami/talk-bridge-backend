import Friend from "../models/friend.model";

const friendRepository = {
    getAllFriends: async (userId: string) => {
        return await Friend.find({ user_id: userId }).populate('friend_id')
    }
}

export default friendRepository;