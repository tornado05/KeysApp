var Customer = require('./Customer.js');
var Worker = require('./Worker.js');

module.exports = function (obj) {
	
	var getCustomer = function () {
		return new Customer(obj.key.customer);
	};

	var serialize = function () {
		return obj;
	};

	var getWorker = function () {
		console.log('getWorker');
		return new Worker(obj.worker);
	};

	return {
		getCustomer: getCustomer,
		serialize: serialize,
		getWorker: getWorker
	};
};