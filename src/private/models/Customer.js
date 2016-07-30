module.exports = function (obj) {

	var getName = function () {
		return obj.name;
	};

	return {
		getName: getName
	};
};