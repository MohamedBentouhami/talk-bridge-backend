import { ParticipantDTO } from "./participant.dto";

export class VoiceroomDTO {
    id: string;
    title: string;
    hostId: string;
    hostName?: string;
    hostPictUrl?: string;
    participants: ParticipantDTO[];
    isActive: boolean;
    languageUsed: string;

    constructor(voiceroom: any) {
        this.id = voiceroom._id;
        this.title = voiceroom.title;
        this.hostId = voiceroom.host_id;
        this.participants = voiceroom.participants;
        this.isActive = voiceroom.is_active;
        this.languageUsed = voiceroom.language_used;
        this.participants = voiceroom.participants.map((participant: any) => new ParticipantDTO(participant));

    }


}


