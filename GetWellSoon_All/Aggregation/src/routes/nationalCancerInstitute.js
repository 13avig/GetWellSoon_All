const { Router } = require('express');
const NationalCancerInstitute = require('../controllers/NationalCancerInstitute');

const router = Router();

router.get('/listing', NationalCancerInstitute.parseListing);
router.get('/individual', NationalCancerInstitute.parseIndividual);

module.exports = router;
