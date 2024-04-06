import mongoose, { Schema } from 'mongoose';

const submitTaskSchema = new Schema({
    task:{
        type: Schema.Types.ObjectId, ref: 'Task', required: true
    },
    mentee:{
        type: Schema.Types.ObjectId, ref: 'Mentee', required: true
    },    
    mentor:{
        type: Schema.Types.ObjectId, ref: 'Mentor', required: true
    },
    githubLink: { type: String }, 
    status: { type: String, enum: ['pending', 'in review', 'completed'], default: 'pending' }, // Task status
})


const SubmitTask = mongoose.model('SubmitTask', submitTaskSchema);

export default SubmitTask;