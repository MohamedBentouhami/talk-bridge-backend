import mongoose from "mongoose";

const voiceroomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    host_id: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    is_active: {
        type: Boolean,
        required: true
    },
    language_used: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Voiceroom = mongoose.model('Voiceroom', voiceroomSchema);
export default Voiceroom;