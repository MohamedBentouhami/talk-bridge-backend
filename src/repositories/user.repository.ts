import type { UserCreationData } from "../@types/user"
import User from "../models/user.model"

const userRepository = {
    addUser: async (userData: UserCreationData) => {
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
    }
}

export default userRepository