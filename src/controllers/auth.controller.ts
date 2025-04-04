import { Request, Response } from "express";
import { getUserByEmail, login, signup } from "../services/user.service";
import { generateJWT } from "../helpers/jwt.helper";

const authController = {
    signup: async (req: Request, res: Response) => {
        const user = req.user;
        const newUser = await signup(user!);
        if (!newUser) {
            res.status(500).json("Creation failed");
            return;
        }
        // const profilePic = req.file;
        // console.log(profilePic);
        const token: string = await generateJWT(newUser._id.toString());
        res.status(201).json({
            user: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                learning_language: newUser.learning_language
            },
            token: token,
        });
    },
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required." });
            return
        }
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
        res.json({
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                learning_language: user.learning_language
            },
            token: token,
        });
    },
    logout: async (req: Request, res: Response) => {
        res.json({ message: "Logged out successfully" });
    }
}

export default authController;