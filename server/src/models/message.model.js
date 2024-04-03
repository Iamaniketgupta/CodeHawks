import mongoose, { Schema } from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false // Initially set to false, indicating the message is unread
    }
}, { timestamps: true });

messageSchema.path('senderId').validate(async function(value) {
    // Check if the senderId exists in the mentor or mentee collections
    const isMentor = await mongoose.model('Mentor').exists({ _id: value });
    const isMentee = await mongoose.model('Mentee').exists({ _id: value });
    return isMentor || isMentee;
}, 'Sender ID does not exist in the mentor or mentee collection');

messageSchema.path('recipientId').validate(async function(value) {
    // Check if the recipientId exists in the mentor or mentee collections
    const isMentor = await mongoose.model('Mentor').exists({ _id: value });
    const isMentee = await mongoose.model('Mentee').exists({ _id: value });
    return isMentor || isMentee;
}, 'Recipient ID does not exist in the mentor or mentee collection');


const Message = mongoose.model('Message', messageSchema);

export default Message;