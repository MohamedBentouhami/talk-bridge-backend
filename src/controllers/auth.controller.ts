import { Request, Response } from "express";
import signup from "../services/user.service";


const authController = {
    signup : async (req: Request, res: Response) =>{
        const user = req.user;
        const newUser = await signup(user!!);
        if(!newUser){
            res.status(500).json(newUser);
            return;
        }
        res.json(newUser);
    }
}

export default authController;