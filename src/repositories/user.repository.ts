import { Languages } from "../@types/languages.enum";
import { statusFriendship } from "../@types/status-friendship.enum";
import type { UserCreationData, UserUpdateData } from "../@types/user"
import { IUser } from "../@types/user.interface";
import { UserDTO } from "../dto/user.dto";
import Friendship from "../models/friendship.model";
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
    getPotentialPartners: async (userId: string): Promise<UserDTO[]> => {
        const users: IUser[] = await User.find({
            _id: { $ne: userId }
        });
        const partners: UserDTO[] = [];

        for (const user of users) {
            const friendship = await Friendship.findOne({ user_id: userId, friend_id: user._id });
            if (friendship) {
                if (friendship.status === statusFriendship.isPending) {
                    partners.push(new UserDTO(user, true));
                }
                continue;

            }
            partners.push(new UserDTO(user, false));
        }

        return partners;
    },
    getUser: async (id: string): Promise<UserDTO> => {
        const user: IUser | null = await User.findById(id);
        return new UserDTO(user!, false);
    },
    updateUser: async (userUpdated: UserUpdateData, userId: string) => {
        await User.findOneAndUpdate({ _id: userId }, {
            first_name: userUpdated.first_name,
            last_name: userUpdated.last_name,
            native_language: userUpdated.native_language,
            learning_language: userUpdated.learning_language,
            bio: userUpdated.bio,
            profile_pict: userUpdated.profile_pict
        });
    }


}

export default userRepository