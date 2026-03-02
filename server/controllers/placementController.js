const PlacementRecord = require('../models/PlacementRecord');
const Application = require('../models/Application');

const createPlacementRecord = async (req, res) => {
    try {
        const { studentId, jobId, companyName, salaryOffered } = req.body;
        const record = new PlacementRecord({
            student: studentId,
            job: jobId,
            companyName,
            salaryOffered,
            placementOfficer: req.user.id
        });
        await record.save();

        // Update application status to accepted if not already
        await Application.findOneAndUpdate(
            { job: jobId, student: studentId },
            { status: 'accepted' }
        );

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPlacementRecords = async (req, res) => {
    try {
        const records = await PlacementRecord.find()
            .populate('student', 'name email')
            .populate('job', 'title')
            .populate('placementOfficer', 'name');
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createPlacementRecord, getPlacementRecords };
