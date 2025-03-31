import { Request, Response } from "express";
import { getUserByEmail, login, signup } from "../services/user.service";



const authController = {
    signup: async (req: Request, res: Response) => {
        const user = req.user;
        const newUser = await signup(user!!);
        if (!newUser) {
            res.status(500).json(newUser);
            return;
        }
        res.json(newUser);
    },
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(403).json("Wrong credentials !");
            return;
        }
        const connected = await login(user.password, password);
        if (!connected) {
            res.status(403).json("Wrong credentials !");
            return;
        }
        res.json("Connected");
    }
}

export default authController;