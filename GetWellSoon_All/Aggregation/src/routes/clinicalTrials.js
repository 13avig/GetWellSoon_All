const { Router } = require('express');
const ClinicalTrials = require('../controllers/ClinicalTrials');

const router = Router();

router.get('/listing', ClinicalTrials.parseListing);
router.get('/individual', ClinicalTrials.parseIndividual);

module.exports = router; 