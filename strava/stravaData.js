require('moment/locale/ru');

var _ = require('lodash'),
	moment = require('moment'),
	strava = require('strava-v3'),

	config = require('../config'),
	stravaData = require('../strava/stravaData'),
	exampleData = require('../strava/exampleData'),
	accessToken = config.accessToken,
	activities;

function getIsSki (activity) {
	return activity.type === 'BackcountrySki' || activity.type === 'NordicSki';
}

function getSeason (activity, isSki) {
	var year = moment(activity.start_date).format('YYYY'),
		month = moment(activity.start_date).format('MM'),
		season = year;

	if (isSki && month < 10) {
		season--;
	}

	return season;
}

function getSeasonName (activity, season) {
	return getIsSki(activity) ? `${season}/${season + 1}` : season;
}

function formatData (allActivities) {
	var data = {};

	for (let activity of allActivities) {
		let isSki = getIsSki(activity),
			season = getSeason(activity, isSki),
			type = isSki ? 'Ski' : activity.type,
			seasonName = getSeasonName(activity, season);

		if (!data[type]) {
			data[type] = {
				seasons: {},
				activities: []
			};
		}

		if (!data[type].seasons[season]) {
			data[type].seasons[season] = {
				title: seasonName,
				activities: []
			};
		}

		activity.season = seasonName;

		activity.name = _.trim(activity.name);
		activity.date_display = moment(activity.start_date).format('DD MMM YYYY');
		activity.date = (new Date(activity.start_date)).valueOf();
		activity.distance = _.round(activity.distance / 1000, 1);

		activity.elapsed_time = _.round(activity.elapsed_time / 60 / 60, 1);
		activity.moving_time = activity.moving_time / 60 / 60;

		activity.total_speed = _.round(activity.distance / activity.elapsed_time, 1);
		activity.moving_speed = _.round(activity.distance / activity.moving_time, 1);

		activity.is_quick = _.lowerCase(activity.name).includes('пляж') || _.lowerCase(activity.name).includes('набережная');
		activity.is_on_base = _.lowerCase(activity.name).includes('чайк');
		activity.is_not_quick = !activity.is_on_base && !activity.is_quick;

		activity = _.pick(activity, ['name', 'date', 'date_display', 'distance', 'elapsed_time', 'moving_time', 'total_speed', 'moving_speed', 'season', 'id', 'is_quick', 'is_not_quick', 'is_on_base']);

		data[type].activities.push(activity);
		data[type].seasons[season].activities.push(activity);
	}

	_.forOwn(data, function (type, key) {
		_.forOwn(type.seasons, function (season) {
			let activities = season.activities,
				elapsedTimeTotal = _.round(_.sum(_.map(activities, 'elapsed_time')), 1),
				companyRides = _.filter(activities, function (el) { return el.name.includes('(+)');	});

			season.ridesAmount = _.keys(_.groupBy(activities, 'date_display')).length;
			season.totalDistance = _.round(_.sum(_.map(activities, 'distance')), 1);

			season.elapsedTime = _.round(_.sum(_.map(activities, 'elapsed_time')), 1);
			season.movingTime = _.round(_.sum(_.map(activities, 'moving_time')), 1);

			season.movingSpeed = _.round(season.totalDistance / season.movingTime, 1);
			season.totalSpeed = _.round(season.totalDistance / season.elapsedTime, 1);

			if (key === 'Ski') {
				season.quickRides = _.filter(activities, 'is_quick'),
				season.quickRidesAmount = _.keys(_.groupBy(season.quickRides, 'date_display')).length;
				season.quickRidesDistance = _.round(_.sum(_.map(season.quickRides, 'distance')), 1);
				season.quickRidesMovingSpeed = _.round(_.sum(_.map(season.quickRides, 'moving_time')), 1);
				season.quickRidesTotalSpeed = _.round(season.quickRidesDistance / season.quickRidesMovingSpeed, 1);
				season.quickRidesElapsedTime = _.round(_.sum(_.map(season.quickRides, 'elapsed_time')), 1);

				season.notQuickRidesMovingSpeed = _.round((season.totalDistance - season.quickRidesDistance) / (season.movingTime - season.quickRidesMovingSpeed), 1);
				season.notQuickRidesTotalSpeed = _.round((season.totalDistance - season.quickRidesDistance) / (elapsedTimeTotal - season.quickRidesElapsedTime), 1);
				season.quickRidesTotalSpeed = _.round(season.quickRidesDistance / season.quickRidesElapsedTime , 1);
			}

			season.companyRidesDistance = _.round(_.sum(_.map(companyRides, 'distance')), 1);
			season.companyRidesAmount = _.keys(_.groupBy(companyRides, 'date_display')).length;
			season.companyRidesTime = _.round(_.sum(_.map(companyRides, 'elapsed_time')), 1);
			season.elapsedTimeTotal = elapsedTimeTotal;

			_.unset(season, 'activities');
		});

		type.seasons = _.values(type.seasons);
	});

	return data;
}

function init () {
	activities = [];
}

function getActivities (params) {
	var res = params.res,
		page = params.page,
		isExampleData = params.isExampleData;

	if (isExampleData == 'true') {
		res.json(exampleData.getData());
	} else {
		strava.athlete.listActivities({
			access_token: accessToken,
			per_page: 200,
			page: page
		}, function (err, payload) {
			if (!err) {
				if (payload && payload.length) {
					activities = activities.concat(payload);
					page++;

					getActivities({
						res: res,
						page: page
					});
				} else {
					res.json({data: formatData(activities)});
				}
			} else {
				res.json(err);
			}
		});
	}
}

function getActivity (res, id) {
	strava.activities.get({
		access_token: accessToken,
		id: id
	}, function (err, payload) {
		var detail = {
			result: []
		};

		if (err) {
			res.json(err);
		} else {

			_.forEach(payload.splits_metric, function (split, index) {
				var distance = split.distance / 1000,
					displayDistance = _.round(distance, 1),
					movingTime = split.moving_time / 60 / 60,
					movingSpeed = _.round(distance / movingTime, 1),
					totalTime = split.elapsed_time / 60 / 60,
					totalSpeed = _.round(distance / totalTime, 1);

				if (distance) {
					detail.result.push({
						index: index + 1,
						distance: _.round(distance, 2),
						moving_speed: movingSpeed,
						total_speed: totalSpeed
					});
				}
			});

			res.json(detail);
		}
	});
}

module.exports = {
	getActivities: getActivities,
	init: init,
	getActivity: getActivity
};
