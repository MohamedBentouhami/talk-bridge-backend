import voiceroomRepository from "../repositories/voiceroom.repository";

export async function getAllVoiceroom(){
    return await voiceroomRepository.getAllVoiceroom();
}
