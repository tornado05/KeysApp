module.exports = function (obj) {
	
	var getId = function () {
		return obj.id;
	};

	var isCurrentUser = function (login, pw) {
		return login === obj.login && pw === obj.pw;
	};

	var getFullName = function () {
		return obj.first_name + " 	" + obj.last_name;
	};

	return {
		getId: getId,
		isCurrentUser: isCurrentUser,
		getFullName: getFullName
	}
};