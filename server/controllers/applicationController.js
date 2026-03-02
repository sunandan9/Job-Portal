const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
    try {
        const { jobId, resume, coverLetter } = req.body;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const existingApplication = await Application.findOne({ job: jobId, student: req.user.id });
        if (existingApplication) return res.status(400).json({ message: 'Already applied for this job' });

        const application = new Application({
            job: jobId,
            student: req.user.id,
            resume,
            coverLetter
        });
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getApplications = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'student') {
            query.student = req.user.id;
        } else if (req.user.role === 'employer') {
            const jobs = await Job.find({ company: req.user.id }).select('_id');
            const jobIds = jobs.map(j => j._id);
            query.job = { $in: jobIds };
        }
        // Admin and Placement Officer can see all (or we could add more filters)

        const applications = await Application.find(query)
            .populate('job', 'title company')
            .populate('student', 'name email');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('job');
        if (!application) return res.status(404).json({ message: 'Application not found' });

        // Only the employer who posted the job or admin/officer can update status
        if (application.job.company.toString() !== req.user.id && !['admin', 'placement_officer'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        application.status = status;
        await application.save();
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { applyForJob, getApplications, updateApplicationStatus };
