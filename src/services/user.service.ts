import type { UserCreationData } from "../@types/user"
import userRepository from "../repositories/user.repository"

export default async function signup(user: UserCreationData){
    return await userRepository.addUser(user);
}