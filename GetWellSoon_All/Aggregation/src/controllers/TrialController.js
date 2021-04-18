const TrialService = require('../../service/TrialService');
const trialInstance = new TrialService();

module.exports = { handleUrls };

async function getTrials(req, res) {
	try {
		await trialInstance.execute();
		return res.send( { code: "done" } );
	} catch (e) {
		return res.send( { code: "oops, try again" } );
	}
}