const { Router } = require('express');
const NationalCancerInstitute = require('../controllers/NationalCancerInstitute');

const router = Router();

router.get('/listing', NationalCancerInstitute.parseListing);

module.exports = router;
