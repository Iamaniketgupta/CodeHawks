import mongoose from 'mongoose';

const { Schema } = mongoose;

const pricingSchema = new Schema({
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required: true
    },
    mentorshipPrice: {
        type: Number,
        required: true,
    },
    targetInterest: {
        type: String,
        required: true,
    },
    specialties: [{
        type: String,
        required: true,
    }]
});

const Pricing = mongoose.model('Pricing', pricingSchema)
export  {Pricing};
