export class FriendDTO {
    id: string;
    firstName: string;
    lastName: string;
    constructor(friend : any) {
        this.id = friend.friend_id._id;
        this.firstName = friend.friend_id.first_name;
        this.lastName = friend.friend_id.last_name;
    }
}