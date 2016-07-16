var fs = require('fs');
var logger = require('./../services/Logger.js');

module.exports = (function () {

	var dbFilePath = './data/user.json';
	var data = [];
	var sessions = [];

	var initialize = function () {
		data = getDataFromFile(dbFilePath);
	};

	var getDataFromFile = function (path) {
        try{
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch(e) {
            logger.logError("Can't read from file");
            return [];
        }            
    };

    var authenticate = function (login, pw) {
    	var users = [];
    	for (var i = 0; i < data.length; ++i) {
    		if (data[i].login === login && data[i].pw === pw) {
    			users.push(data[i]);
    		}
    	}
    	if (users.length > 1) {
    		logger.logError("Multiple user creds" + JSON.stringify(users));
    		throw {
    			message: "Bad DB"
    		};
    	}
    	if (users.length === 1) {
    		return createSession(users[0]);
    	} else {
    		return null;
    	}
    };

    var createSession = function (user) {
    	var sessionId = sessions.length + 1;
    	var session = {
    		id: sessionId,
    		user_id: user.id,
    		user_name: user.name,
    		token: generateToken()
    	};
    	sessions.push(session);
    	return session;
    };

    var generateToken = function () {
    	var letter = "fdgfdslkjlfkdsjhfdsfFGFDSFDSFFDSFDSFcxzczxpr5574876985674597";
    	var token = '';
    	for (var i = 0; i < 32; ++i) {
    		token += letter[Math.floor(Math.random() * (letter.length)) + 1];
    	}    	
    	return token;
    };

    var authorize = function (token) {
    	var session = null;
    	for (var i = 0; i < sessions.length; ++i) {
    		if (sessions[i].token === token) {    			
    			session = sessions[i];
    		}
    	}
    	return !!session;
    }

	initialize();

	return {
		authenticate: authenticate,
		authorize: authorize
	};
})();