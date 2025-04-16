import { VoiceroomCreation } from "../@types/voiceroom";
import { VoiceroomDTO } from "../dto/voiceroom.dto";
import Voiceroom from "../models/voiceroom.model"

const voiceroomRepository = {
    getAllVoiceroom: async (): Promise<VoiceroomDTO[]> => {
        const voicerooms = await Voiceroom.find().populate('participants').sort({ createdAt: -1 });
        return voicerooms.map(voiceroom => new VoiceroomDTO(voiceroom));
    },
    createVoiceroom: async (voiceroom: VoiceroomCreation): Promise<VoiceroomDTO> => {
        const newVoiceroom = new Voiceroom({
            title: voiceroom.title,
            host_id: voiceroom.hostId,
            is_active: true,
            language_used: voiceroom.language,
            participants: [voiceroom.hostId]
        })

        await newVoiceroom.save()
        return new VoiceroomDTO(newVoiceroom);
    },
    closeVoiceroom: async (voiceroomId: string) => {
        await Voiceroom.findByIdAndUpdate(voiceroomId, { is_active: false });
    },
    joinVoiceroom: async (voiceroomId: string, userId: string) => {
        await Voiceroom.findByIdAndUpdate(voiceroomId, { $addToSet: { participants: userId } }
        );
    }

}

export default voiceroomRepository;