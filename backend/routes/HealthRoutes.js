const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/HealthController');

router.get('/alive', healthCheck);

module.exports = router;
