module.exports = function (obj) {

	var getId = function () {
		return obj.id;
	};

	var serialize = function () {
		return obj;
	};

	return {
		getId: getId,
		serialize: serialize
	};
};