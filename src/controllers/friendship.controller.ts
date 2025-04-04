import { Request, Response } from "express";
import { doesUserExist, getAllFriends } from "../services/user.service";
import { addFriend, friendshipAlreadyExist, handleFriendshipRequest } from "../services/friend.service";

const friendshipController = {
    getAllFriends: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friends = await getAllFriends(userId!);
        res.json(friends);
    },
    addFriend: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if (friendship) {
            res.status(409).json({ error: "Cannot add this friend" })
            return;
        }
        await addFriend(userId!, friendId!);
        res.json({ "msg": "User add successfully" });
    },
    friendRequestTreatment: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const status = req.body.status;
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if(!friendship) {
            res.status(409).json({ error: "This friendship doesn't exist" })
            return;
        }
        await handleFriendshipRequest(userId!, friendId!, status);
        res.json({ "msg": "User add successfully" });
    }
}

export default friendshipController;