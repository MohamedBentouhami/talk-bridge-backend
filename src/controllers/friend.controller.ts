import { Request, Response } from "express";
import { getAllFriends } from "../services/user.service";

const friendController = {
    getAllFriends: (req: Request, res: Response) => {
        const userId = req.userId;
        const friends = getAllFriends(userId!);
        res.json(friends);
    }
}

export default friendController;