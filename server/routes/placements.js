const express = require('express');
const { createPlacementRecord, getPlacementRecords } = require('../controllers/placementController');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, authorize(['admin', 'placement_officer']), getPlacementRecords);
router.post('/', auth, authorize(['admin', 'placement_officer']), createPlacementRecord);

module.exports = router;
