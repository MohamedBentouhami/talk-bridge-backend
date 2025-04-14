import Voiceroom from "../models/voiceroom.model"

const voiceroomRepository = {
    getAllVoiceroom: async () => {
        return await Voiceroom.find();
    }
}

export default voiceroomRepository;