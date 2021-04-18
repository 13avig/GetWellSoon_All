const UrlService = require('../../service/UrlService');
const urlInstance = new UrlService();

module.exports = { handleUrls };

async function getUrls(req, res) {
	try {
		await urlInstance.execute();
		return res.send( { code: "done" } );
	} catch (e) {
		return res.send( { code: "oops, try again" } );
	}
}