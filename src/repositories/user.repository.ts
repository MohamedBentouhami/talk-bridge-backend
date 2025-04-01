import { Languages } from "../@types/languages.enum";
import type { UserCreationData } from "../@types/user"
import { IUser } from "../@types/user.interface";
import { UserDTO } from "../dto/user.dto";
import User from "../models/user.model"

const userRepository = {
    addUser: async (userData: UserCreationData): Promise<IUser> => {
        const newUser = new User({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password,
            birthday: userData.birth_date,
            native_language: userData.native_language,
            learning_language: userData.learning_language,
            bio: userData.bio,
        })

        await newUser.save();
        return newUser;
    },
    getUserByEmail: async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email });
    },
    getUsersByNativeLanguage: async (lg: Languages): Promise<UserDTO[]> => {
        const users: IUser[] = await User.find({ native_language: lg });
        return users.map((user) => new UserDTO(user));
    }
}

export default userRepository