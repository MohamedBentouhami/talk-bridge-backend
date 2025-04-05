import { Languages } from "../@types/languages.enum";
import type { UserCreationData } from "../@types/user"
import { IUser } from "../@types/user.interface";
import { UserDTO } from "../dto/user.dto";
import Friend from "../models/friendship.model";
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
            profile_pict: userData.profile_pict
        })

        await newUser.save();
        return newUser;
    },
    doesUserExist: async (id: string): Promise<boolean> => {
        const user = await User.findById(id);
        return user !== undefined;
    },
    getUserByEmail: async (email: string): Promise<IUser | null> => {
        return await User.findOne({ email });
    },
    getUsersByNativeLanguage: async (lg: Languages, userId: string): Promise<UserDTO[]> => {
        const friends = await Friend.find({ user_id: userId });
        const friendIds = friends.map(friend => friend.friend_id);
        const users: IUser[] = await User.find({ native_language: lg, _id: { $nin: friendIds } });
        return users.map((user) => new UserDTO(user));
    }
}

export default userRepository