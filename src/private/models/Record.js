var Customer = require('./Customer.js');
var Worker = require('./Worker.js');
var Appartment = require('./Appartment.js');

module.exports = function (obj) {
	
	var getCustomer = function () {
		return new Customer(obj.key.customer);
	};

	var serialize = function () {
		return obj;
	};

	var getWorker = function () {
		return new Worker(obj.worker);
	};

	var getDate = function () {
		return Date.parse(obj.date);
	};

	var getAppartment = function () {
		return new Appartment(obj.key.apartment);
	};

	var getKeyName = function () {
		return obj.key.name
	};

	var getKeyId = function () {
		return obj.key.id;
	}

	return {
		getCustomer: getCustomer,
		serialize: serialize,
		getWorker: getWorker,
		getDate: getDate,
		getAppartment: getAppartment,
		getKeyName: getKeyName,
		getKeyId: getKeyId
	};
};