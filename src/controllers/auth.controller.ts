import { Request, Response } from "express";
import { getUserByEmail, login, signup } from "../services/user.service";
import { generateJWT } from "../helpers/jwt.helper";



const authController = {
    signup: async (req: Request, res: Response) => {
        const user = req.user;
        const newUser = await signup(user!);
        if (!newUser) {
            res.status(500).json(newUser);
            return;
        }
        const token: string = await generateJWT(newUser._id.toString());
        res.json(token);
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
        const token: string = await generateJWT(user._id);
        res.json(token);
    },
    logout: async (req: Request, res: Response) => {
        res.json({ message: "Logged out successfully" });
    }
}

export default authController;