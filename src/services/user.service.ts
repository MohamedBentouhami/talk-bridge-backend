import type { UserCreationData } from "../@types/user"
import userRepository from "../repositories/user.repository"
import * as argon2 from "argon2";

export async function signup(user: UserCreationData) {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
    return await userRepository.addUser(user);
}

export async function login(hashedPassword: string, password: string) {
    const connected = await argon2.verify(hashedPassword, password);
    return connected;
}

export async function getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
}