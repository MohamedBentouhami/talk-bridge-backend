import { Request, Response } from "express";
import { getAllFriends } from "../services/user.service";
import { acceptFriendshipRequest, addFriend, friendshipAlreadyExist, getNewRequester, getNewRequesters, refuseFriendshipRequest } from "../services/friend.service";
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
        const friendId = req.body.friend_id; // use middleware ??
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if (friendship) {
            res.status(409).json({ error: "Cannot add this friend" })
            return;
        }
        const idFriendship = await addFriend(userId!, friendId!);
        const newRequester = await getNewRequester(idFriendship);
        const socketId = getSocketId(friendId);
        console.log("socketId", socketId)
        console.log("newRequester", newRequester);
        console.log(friendId);

        if (socketId) {
            console.log("Notification")
            io.to(socketId).emit("new_request", { newRequester })
        } else {
            console.log("user not connected")
        }
        res.json({ "msg": "User add successfully" });
    },
    acceptFriendRequest: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if (!friendship) {
            res.status(409).json({ error: "This friendship doesn't exist" })
            return;
        }
        const newFriend = await acceptFriendshipRequest(userId!, friendId!);
        const socketId = getSocketId(friendId);
        if (socketId) {
            console.log("Notification")
            io.to(socketId).emit("accepted_friend", { newFriend })
        } else {
            console.log("user not connected")
        }

        res.json({ "msg": "Friend request accepted" });
    },
    refusedFriendRequest: async (req: Request, res: Response) => {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const friendship = await friendshipAlreadyExist(userId!, friendId);
        if (!friendship) {
            res.status(409).json({ error: "This friendship doesn't exist" })
            return;
        }
        await refuseFriendshipRequest(userId!, friendId!);
        const socketId = getSocketId(friendId);
        if (socketId) {
            console.log("Notification")
            io.to(socketId).emit("cancel_friend", { userId })
        } else {
            console.log("user not connected")
        }
        res.json({ "msg": "Friend request refused" });
    }
}

export default friendshipController;