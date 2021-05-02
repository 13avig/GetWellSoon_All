const Status = require('http-status');
const debug = require('debug')('aggregationapp:controllers/NationalCancerInstitute');
const { ParseListing } = require('../services/NationalCancerInstitute');

const NationalCancerInstitute = {

  parseListing: async (req, res, next) => {
    try {
      await (new ParseListing()).execute();
      res.status(Status.OK).json({ code: "success" });
    } catch (e) {
      debug('parseListing', e);
      res.status(Status.NOT_IMPLEMENTED).json({ code: "error" });
    }
  }
};

module.exports = NationalCancerInstitute;
