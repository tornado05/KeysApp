module.exports = function (obj) {

	var getId = function () {
		return obj.id;
	};

	var getNumber = function () {
		return parseInt(obj.number);
	};

	var serialize = function () {
		return obj;
	};

	return {
		getId: getId,
		getNumber: getNumber,
		serialize: serialize	
	};
};