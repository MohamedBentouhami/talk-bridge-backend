import { Languages } from "../@types/languages.enum";
import type { UserCreationData } from "../@types/user"
import { IUser } from "../@types/user.interface";
import { UserDTO } from "../dto/user.dto";
import friendRepository from "../repositories/friend.repository";
import messageRepository from "../repositories/message.repository";
import userRepository from "../repositories/user.repository"
import * as argon2 from "argon2";

export async function signup(user: UserCreationData) {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
    return await userRepository.addUser(user);
}

export async function login(hashedPassword: string, password: string) {
    console.log(hashedPassword, password);

    const connected = await argon2.verify(hashedPassword, password);
    return connected;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.getUserByEmail(email);
}
export async function getUsersByLanguage(lg: Languages): Promise<UserDTO[]> {
    return await userRepository.getUsersByNativeLanguage(lg);
}

export async function getMessages(userId: string, userId2: string) {
    return await messageRepository.getMessagesBetweenFriends(userId, userId2);
}

export async function doesUserExist(id: string) {
    return await userRepository.doesUserExist(id);
}

export async function getAllFriends(userId: string){
    return await friendRepository.getAllFriends(userId);
}