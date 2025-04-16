export class ParticipantDTO {
    id: string;
    firstName: string;
    lastName: string;
    profilePictUrl?: string;

    constructor(user: any) {
        this.id = user._id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.profilePictUrl = user.profile_pict; 
    }
}
