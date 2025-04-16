import { VoiceroomCreation } from "../@types/voiceroom";
import { ParticipantDTO } from "../dto/participant.dto";
import { VoiceroomDTO } from "../dto/voiceroom.dto";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";
import voiceroomRepository from "../repositories/voiceroom.repository";

export async function getAllVoiceroom() {
    const voicerooms = await voiceroomRepository.getAllVoiceroom();
    for (let vr of voicerooms) {
        const user = await userRepository.getUser(vr.hostId);
        vr.hostName = `${user.firstName} ${user.lastName}`
        vr.hostPictUrl = user.profilePict;
    }

    return voicerooms;
}


export async function createVoiceroom(voiceroom: VoiceroomCreation): Promise<VoiceroomDTO> {

    const newVr = await voiceroomRepository.createVoiceroom(voiceroom);
    const user = await userRepository.getUser(newVr.hostId);
    newVr.hostName = `${user.firstName} ${user.lastName}`
    newVr.hostPictUrl = user.profilePict;
    return newVr;

}

export async function closeVoiceroom(voiceroomId: string) {
    await voiceroomRepository.closeVoiceroom(voiceroomId);
}
export async function joinVoiceroom(voiceroomId: string, userId: string) {
    await voiceroomRepository.joinVoiceroom(voiceroomId, userId);
    const participant = await User.findById(userId);
    return new ParticipantDTO(participant);

}