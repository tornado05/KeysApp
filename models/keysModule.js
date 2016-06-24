var fs = require('fs');
var logger = require('./../services/Logger.js');

module.exports = (function () {            
        var getDataFromFile = function (path) {
            try{
                var result = fs.readFileSync(path, 'utf8');
                return JSON.parse(result);
            } catch(e) {
                logger.logError("Can't read from file");
                return [];
            }            
        };
	
	var searchByCustomer = function (customerName) {		
		// All coll stuff find here
		var result = [];
		var expression = new RegExp("^" + customerName + "(.*)")
		for(var i = 0; i < data.length; ++i) {
			if(data[i].key.customer.name.search(expression) > -1) {
				result.push(data[i]);
			}
		}
		return result;
	};
	
	var searchByWorker = function (id) {		
		var result = [];
		for (var i = 0; i < data.length; ++i) {
			if (data[i].worker.id === parseInt(id)) {
				result.push(data[i]);
			}
		}
		return result;
	};
	
	var searchByDate = function (date) {
		var result = [];
		for(var i = 0; i < data.length; ++i) {
			if(Date.parse(data[i].date) === Date.parse(date)) {
				result.push(data[i]);
			}
		}
		return result;
	};
	
	var getAllWorkers = function () {
		var result = [];
		var workers = [];
		for (var i = 0; i < data.length; ++i) {
			workers.push(data[i].worker);
		}
		for (var i = 0; i < workers.length; ++i) {
			var unique = true;
			for (var j = 0; j < result.length; ++j) {
				if (workers[i].id === result[j].id) {
					unique = false;
				}
			}
			if (unique) {
				result.push(workers[i]);
			}			
		}
		return result;
	};
	
	var getAll = function () {
		return data;
	};
        
        var data = getDataFromFile('./data/data.json');

	return {
		searchByCustomer: searchByCustomer,
		searchByDate: searchByDate,
		getAll: getAll,
		getAllWorkers: getAllWorkers,
		searchByWorker: searchByWorker
	};
})();

/*console.log(keysModule.searchByCustomer("customer 1"));
console.log(keysModule.searchByDate("2015-10-12 14:44:14"));
var session = keysModule.searchByDate("2015-10-12 14:44:14");
console.log(new Date(session[0].date))
var sessionDate = new Date(session[0].date);
console.log("It way the " + (sessionDate.getDay() + 1) + " day of the week");
console.log("UTC time: " + sessionDate.getUTCDate());
console.log("Number of seconds from 01.01.1970: " + sessionDate.getTime());

console.log( Math.round(((Date.now() - sessionDate.getTime()) / (3600 * 24))) + " days ago");*/
