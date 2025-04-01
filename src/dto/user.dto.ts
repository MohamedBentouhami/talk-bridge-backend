import { IUser } from "../@types/user.interface";

export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    constructor(user : IUser) {
        this.id = user._id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
    }
}