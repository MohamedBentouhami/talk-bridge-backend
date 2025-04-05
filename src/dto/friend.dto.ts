export class FriendDTO {
    id: string;
    firstName: string;
    lastName: string;
    profilePict: string;
    constructor(friend : any) {
        this.id = friend.friend_id._id;
        this.firstName = friend.friend_id.first_name;
        this.lastName = friend.friend_id.last_name;
        this.profilePict = friend.friend_id.profile_pict;
    }
}