import { Request, Response } from "express";
import { doesUserExist, getAllFriends } from "../services/user.service";
import { addFriend, friendshipAlreadyExist, getNewRequesters, handleFriendshipRequest } from "../services/friend.service";
import { getSocketId, io } from "../socket";

const friendshipController = {
    getAllFriends: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friends = await getAllFriends(userId!);
        res.json(friends);
    },
    getNewRequesters: async (req: Request, res: Response) => {
        const userId = req.userId;
        const newRequesters = await getNewRequesters(userId!);
        res.json(newRequesters);
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
        const socketId = getSocketId(friendId);
        console.log("socketId", socketId)
        if (socketId) {
            io.to(socketId).emit("new_request", { "msg": "wanna be my friend ?" })
        } else {
            console.log("user no connected");
        }
        res.json({ "msg": "User add successfully" });
    },
    friendRequestTreatment: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const status = req.body.status;
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if (!friendship) {
            res.status(409).json({ error: "This friendship doesn't exist" })
            return;
        }
        await handleFriendshipRequest(userId!, friendId!, status);
        res.json({ "msg": "User add successfully" });
    }
}

export default friendshipController;