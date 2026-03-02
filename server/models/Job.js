const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String },
    salary: { type: String },
    requirements: [{ type: String }],
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
