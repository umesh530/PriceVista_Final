const express = require('express');
const router = express.Router();
const { createAlert, getAlertsForUser, updateAlert, deleteAlert } = require('../controllers/alertController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', createAlert);
router.get('/', getAlertsForUser);
router.put('/:id', updateAlert);
router.delete('/:id', deleteAlert);

module.exports = router;
