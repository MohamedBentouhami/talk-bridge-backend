export class RequesterDTO {
    id: string;
    firstName: string;
    lastName: string;
    profilePict: string;
    constructor(friend : any) {
        this.id = friend.user_id._id;
        this.firstName = friend.user_id.first_name;
        this.lastName = friend.user_id.last_name;
        this.profilePict = friend.user_id.profile_pict;
    }
}