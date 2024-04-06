import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    mentor: { type: Schema.Types.ObjectId, ref: 'Mentor', required: true }, 
    mentee:[ { type: Schema.Types.ObjectId, ref: 'Mentee', required: true }], 
    title: { type: String, required: true },
    description: { type: String },
    githubLink: { type: String }, 
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
