var stravaData = require('../strava/stravaData'),
	exampleData = require('../strava/exampleData');

function mainStatsRoute (app) {
	app
		.get('/', function (req, res) {
			res.render('index');
		})
		.get('/api/summary', function (req, res) {
			stravaData.init();
			stravaData.getActivities({
				res: res,
				page: 1,
				isExampleData: req.query.isExampleData
			});
		})
		.get('/api/exampleJson', function (req, res) {
			res.json(exampleData.getData());
		})
		.get('/api/activity', function (req, res) {
			stravaData.getActivity(res, req.query.id);
		});
}

module.exports = mainStatsRoute;
