require('moment/locale/ru');

var _ = require('lodash'),
	moment = require('moment'),
	strava = require('strava-v3'),

	config = require('../config'),
	stravaData = require('../strava/stravaData'),
	exampleData = require('../strava/exampleData'),
	decodePolyline = require('decode-google-map-polyline'),
	accessToken = config.accessToken,
	activities;

function getSpeed (distance, time) {
	var time = time / 60 / 60,
		distance = distance / 1000;

	return _.round(distance / time, 1);
}

function getTimeToH (time) {
	return time / 60 / 60;
}

function formatDistance (distance) {
	return _.round(distance / 1000, 1);
}

function formatDate (date) {
	return moment(date).format('DD MMM YYYY')
}

function formatDateMs (date) {
	return (new Date(date)).valueOf();
}

function getRestTime (activity) {
	return activity.elapsed_time - activity.moving_time;
}

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
	return getIsSki(activity) ? `${season}/${parseInt(season, 10) + 1}` : season;
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
				id: _.uniqueId(),
				title: seasonName,
				activities: []
			};
		}

		activity.season = seasonName;

		activity.name = _.trim(activity.name);
		activity.date_display = formatDate(activity.start_date);
		activity.date = formatDateMs(activity.start_date);
		activity.distance = _.round(activity.distance / 1000, 1);

		activity.total_speed = _.round(activity.distance / (activity.elapsed_time / 60 / 60), 1);

		activity.rest_time = getRestTime(activity);
		activity.elapsed_time = activity.elapsed_time;
		activity.moving_time = activity.moving_time / 60 / 60;

		activity.moving_speed = _.round(activity.distance / activity.moving_time, 1);

		activity.is_quick = _.lowerCase(activity.name).includes('пляж') || _.lowerCase(activity.name).includes('набережная');
		activity.is_on_base = _.lowerCase(activity.name).includes('чайк');
		activity.is_not_quick = !activity.is_on_base && !activity.is_quick;

		activity = _.pick(activity, ['name', 'date', 'date_display', 'distance', 'elapsed_time', 'moving_time', 'total_speed', 'moving_speed', 'rest_time', 'season', 'id', 'is_quick', 'is_not_quick', 'is_on_base']);

		data[type].activities.push(activity);
		data[type].seasons[season].activities.push(activity);
	}

	_.forOwn(data, function (type, key) {
		_.forOwn(type.seasons, function (season) {
			let activities = season.activities,
				elapsedTimeTotal = _.round(_.sum(_.map(activities, 'elapsed_time')) / 60 / 60, 2),
				companyRides = _.filter(activities, function (el) { return el.name.includes('(+)');	});

			season.ridesAmount = _.keys(_.groupBy(activities, 'date_display')).length;
			season.totalDistance = _.round(_.sum(_.map(activities, 'distance')), 2);

			season.elapsedTime = elapsedTimeTotal;
			season.movingTime = _.round(_.sum(_.map(activities, 'moving_time')), 2);

			season.movingSpeed = _.round(season.totalDistance / season.movingTime, 1);
			season.totalSpeed = _.round(season.totalDistance / season.elapsedTime, 1);

			if (key === 'Ski') {
				let notQuickRides = _.filter(activities, 'is_not_quick'),
					notQuickRidesDistance = _.sum(_.map(notQuickRides, 'distance'));

				season.quickRides = _.filter(activities, 'is_quick');
				season.quickRidesAmount = _.keys(_.groupBy(season.quickRides, 'date_display')).length;
				season.quickRidesDistance = _.sum(_.map(season.quickRides, 'distance'));
				season.quickRidesMovingTime = _.sum(_.map(season.quickRides, 'moving_time'));
				season.quickRidesMovingSpeed = season.quickRidesDistance / season.quickRidesMovingTime;
				season.quickRidesElapsedTime = getTimeToH(_.sum(_.map(season.quickRides, 'elapsed_time')));
				season.quickRidesTotalSpeed = _.round(season.quickRidesDistance / season.quickRidesElapsedTime, 1);

				season.notQuickRidesMovingSpeed = _.round(notQuickRidesDistance / _.sum(_.map(notQuickRides, 'moving_time')), 1);
				season.notQuickRidesTotalSpeed = _.round(notQuickRidesDistance / getTimeToH(_.sum(_.map(notQuickRides, 'elapsed_time'))), 1);

				season.quickRidesDistance = _.round(season.quickRidesDistance, 1);
				season.quickRidesMovingSpeed = _.round(season.quickRidesMovingSpeed, 1);
				season.quickRidesElapsedTime = _.round(season.quickRidesElapsedTime, 1);
			}

			season.companyRidesDistance = _.round(_.sum(_.map(companyRides, 'distance')), 1);
			season.companyRidesAmount = _.keys(_.groupBy(companyRides, 'date_display')).length;
			season.companyRidesTime = _.round(_.sum(_.map(companyRides, 'elapsed_time')) / 60 / 60, 1);

			season.distanceByMonths = [];

			for (var i = 1; i <= 12; i++) {
				let monthActivities = _.filter(activities, function (el) {
					return moment(el.date).format('MM') == i;
				}),
					index;

				if (monthActivities.length) {
					index = key === 'Ski' && i > 9 ? i - 13 : i;

					season.distanceByMonths.push({
						index: index,
						title: moment(i, 'M').format('MMMM'),
						value: _.round(_.sum(_.map(monthActivities, 'distance')), 1)
					});
				}
			}

			if (key === 'Ski') {
				season.distanceByMonths = _.sortBy(season.distanceByMonths, 'index');
			}

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

function getSplits (res, id) {
	strava.activities.get({
		access_token: accessToken,
		id: id
	}, function (err, payload) {
		var detail = {
			splits: []
		};

		if (err) {
			res.json(err);
		} else {
			detail.name = payload.name;

			_.forEach(payload.splits_metric, function (split, index) {
				var distance = split.distance / 1000,
					displayDistance = _.round(distance, 1),
					movingTime = split.moving_time / 60 / 60,
					movingSpeed = _.round(distance / movingTime, 1),
					totalTime = split.elapsed_time / 60 / 60,
					totalSpeed = _.round(distance / totalTime, 1);

				if (displayDistance) {
					detail.splits.push({
						index: index + 1,
						distance: _.round(distance, 2),
						moving_speed: movingSpeed,
						total_speed: totalSpeed,
						rest_time: getRestTime(split)
					});
				}
			});

			res.json(detail);
		}
	});
}

function getSegments (res, id) {
	strava.activities.get({
		access_token: accessToken,
		id: id
	}, function (err, payload) {
		var detail = {
			segments: []
		};

		if (err) {
			res.json(err);
		} else {
			detail.name = payload.name;
			detail.date = moment(payload.start_date).format('DD MMM YYYY');

			_.forEach(payload.segment_efforts, function (segment) {
				detail.segments.push({
					id: segment.segment.id,
					name: segment.name,
					distance: formatDistance(segment.distance),
					achievements: _.pick(segment.achievements, 'type', 'rank'),
					moving_speed: getSpeed(segment.distance, segment.moving_time),
					total_speed: getSpeed(segment.distance, segment.elapsed_time),
					elapsed_time: segment.elapsed_time,
					rest_time: getRestTime(segment)
				});
			});

			res.json(detail);
		}
	});
}

function getSegmentLeaderboard (res, id, distance) {
	strava.segments.listLeaderboard({
		access_token: accessToken,
		id: id,
		per_page: 200
	}, function (err, payload) {
		var detail = {
			entries: []
		},
		distanceM = distance * 1000;

		if (err) {
			res.json(err);
		} else {
			detail.effort_count = payload.effort_count;
			detail.entry_count = payload.entry_count;

			_.forEach(payload.entries, function (el) {
				var data = {};

				if (distance) {
					data.moving_speed = getSpeed(distanceM, el.moving_time);
					data.total_speed = getSpeed(distanceM, el.elapsed_time);
				}

				data.athlete_name = el.athlete_name;
				data.rank = el.rank;
				data.rest_time = getRestTime(el);
				data.elapsed_time = el.elapsed_time;

				detail.entries.push(data);
			});

			res.json(detail);
		}
	});
}

function getSegmentMyEfforts (res, id) {
	strava.segments.listEfforts({
		access_token: accessToken,
		id: id,
	}, function (err, payload) {
		var detail = [];

		if (err) {
			res.json(err);
		} else {
			_.forEach(payload, function (el) {
				detail.push({
					id: el.activity.id,
					date: formatDateMs(el.start_date),
					date_display: formatDate(el.start_date),
					elapsed_time: el.elapsed_time,
					moving_time: el.moving_time,
					distance: formatDistance(el.distance),
					moving_speed: getSpeed(el.distance, el.moving_time),
					total_speed: getSpeed(el.distance, el.elapsed_time),
					rest_time: getRestTime(el),
					kom_rank: el.kom_rank,
					pr_rank: el.pr_rank,
					achievements: el.achievements
				});
			});

			return res.json(_.orderBy(detail, 'date', 'desc'));
		}
	});
}

function getSegmentMap (res, id) {
	strava.segments.get({
		access_token: accessToken,
		id: id
	}, function (err, payload) {
		if (err) {
			res.json(err);
		} else {
			payload.route = decodePolyline(payload.map.polyline);
			res.json(_.pick(payload, ['start_latitude', 'start_longitude', 'end_latitude', 'end_longitude', 'route']));
		}
	});
}

module.exports = {
	getActivities: getActivities,
	init: init,
	getSplits: getSplits,
	getSegments: getSegments,
	getSegmentLeaderboard: getSegmentLeaderboard,
	getSegmentMyEfforts: getSegmentMyEfforts,
	getSegmentMap: getSegmentMap
};
