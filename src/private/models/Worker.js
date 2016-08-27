module.exports = function (obj) {

	var getId = function () {
		return obj.id;
	};

	var getName = function () {
		return obj.name;
	};

	var serialize = function () {
		return obj;
	};

	return {
		getId: getId,
		getName: getName,
		serialize: serialize
	};
};