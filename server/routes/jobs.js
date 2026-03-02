const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', auth, authorize(['employer', 'admin']), createJob);
router.put('/:id', auth, authorize(['employer', 'admin']), updateJob);
router.delete('/:id', auth, authorize(['employer', 'admin']), deleteJob);

module.exports = router;
