const express = require('express');
const { applyForJob, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getApplications);
router.post('/', auth, authorize('student'), applyForJob);
router.put('/:id/status', auth, authorize(['employer', 'admin', 'placement_officer']), updateApplicationStatus);

module.exports = router;
