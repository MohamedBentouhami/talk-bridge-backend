import { IUser } from "../@types/user.interface";

export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    profilePict: string;
    nativeLanguage: string;
    targetLanguage: string;
    bio: string;
    isPending: boolean;
    email: string;
    constructor(user : IUser, isPending: boolean) {
        this.id = user._id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.profilePict= user.profile_pict;
        this.nativeLanguage = user.native_language;
        this.targetLanguage = user.learning_language;
        this.bio = user.bio;
        this.isPending = isPending;
        this.email = user.email
    }
}