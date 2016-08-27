module.exports = function (obj) {

	var getName = function () {
		return obj.name;
	};

	var getId = function () {
		return obj.id;
	};

	return {
		getName: getName,
		getId: getId
	};
};