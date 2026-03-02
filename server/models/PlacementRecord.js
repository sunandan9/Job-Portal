const mongoose = require('mongoose');

const placementRecordSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    companyName: { type: String, required: true },
    salaryOffered: { type: String },
    dateOfPlacement: { type: Date, default: Date.now },
    placementOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('PlacementRecord', placementRecordSchema);
