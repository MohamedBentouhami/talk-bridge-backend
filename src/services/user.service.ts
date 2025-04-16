import type { UserCreationData, UserUpdateData } from "../@types/user"
import { IUser } from "../@types/user.interface";
import { UserDTO } from "../dto/user.dto";
import friendshipRepository from "../repositories/friend.repository";
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

export async function getUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.getUserByEmail(email);
}
export async function getPotentialPartners(userId: string): Promise<UserDTO[]> {
    return await userRepository.getPotentialPartners(userId);
}

export async function doesUserExist(id: string) {
    return await userRepository.doesUserExist(id);
}

export async function getAllFriends(userId: string) {
    return await friendshipRepository.getAllFriends(userId);
}

export async function getUser(userId: string): Promise<UserDTO> {
    return await userRepository.getUser(userId);
}

export async function updateData(userUpdated : UserUpdateData, userId : string){
    await userRepository.updateUser(userUpdated, userId)
}