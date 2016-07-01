var fs = require('fs');
var logger = require('./../services/Logger.js');

module.exports = (function () {            
        
        var dbFilePath = './data/data.json';
    
        var getDataFromFile = function (path) {
                fs.readFile(
                    path, 
                    'utf8', 
                    function (err, result) {
                    if(err) {
                        logger.logError("Can't read from file");
                        data = [];
                    } 
                    data = JSON.parse(result);
                });      
        };
	
	var searchByCustomer = function (customerName) {		
		// All coll stuff find here
		var result = [];
		var expression = new RegExp("^" + customerName + "(.*)");
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
        
        var prepareRecord = function (params) {            
            var result = {};            
            result.id = data.length + 1; 
            result.date = getDate();
            var customer = getCustomerByName(params.customer_name);
            var worker = getWorkerByName(params.worker_name);
            var apartment = getApartmentByNumber(params.appartment_number);
            var key = getKeyByParams(params.key_name, customer, apartment);
            result.worker = worker;
            result.key = key;
            return result;
        };
        
        var validateParams = function (params) {
            console.log("Validating params");
            console.log(
                    (params.customer_name && params.customer_name.match(/^(.*[a-zA-Z ])$/)) && 
                    (params.appartment_number && params.appartment_number.match(/[0-9]/)) && 
                    (params.worker_name && params.worker_name.match(/^(.*[a-zA-Z ])$/)) && 
                    (params.key_name && params.key_name.match(/^(.*[a-zA-Z ])$/))
                    );
            return (
                    (params.customer_name && params.customer_name.match(/^(.*[a-zA-Z ])$/)) && 
                    (params.appartment_number && params.appartment_number.match(/[0-9]/)) && 
                    (params.worker_name && params.worker_name.match(/^(.*[a-zA-Z ])$/)) && 
                    (params.key_name && params.key_name.match(/^(.*[a-zA-Z ])$/))
                );
        };
        
        var getDate = function () {
            var formattedDate = '';
            var date = new Date();
            formattedDate += date.getFullYear() + "-";
            formattedDate += date.getMonth() + 1 + "-";
            formattedDate += date.getDate() + " ";
            formattedDate += date.getHours() + ":";
            formattedDate += date.getMinutes() + ":";
            formattedDate += date.getSeconds();
            return formattedDate;
        };
        
        var getCustomerByName = function (name) {
            var result = null;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.customer.name === name) {
                    result = data[i].key.customer;
                }
            }
            if (result) {
                return result;
            }
            var maxCustomerId = 1;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.customer.id > maxCustomerId) {
                    maxCustomerId = data[i].key.customer.id;
                }
            }
            result = {
                id: ++maxCustomerId,
                name: name
            };
          return result;
        };
        
        var getWorkerByName = function (name) {
            var result = null;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].worker.name === name) {
                    result = data[i].worker;
                }
            }
            if (result) {
                return result;
            }
            var maxWorkerId = 1;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].worker.id > maxWorkerId) {
                    maxWorkerId = data[i].worker.id;
                }
            }
            result = {
                id: ++maxWorkerId,
                name: name
            };
          return result;
        };
        
        var getApartmentByNumber = function (number) {
            var result = null;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.apartment.number === parseInt(number)) {
                    result = data[i].key.apartment;
                }
            }
            if (result) {
                return result;
            }
            var maxApartmentId = 1;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.apartment.id > maxApartmentId) {
                    maxApartmentId = data[i].key.apartment.id;
                }
            }
            result = {
                id: ++maxApartmentId,
                number: number
            };
          return result;
        };
        
        var getKeyByParams = function (name, customer, appartment) {
            var result = null;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.name === name && 
                    data[i].key.customer.id === customer.id &&
                    data[i].key.apartment.id === appartment.id) {
                    result = data[i].key;
                }
            }
            if (result) {
                return result;
            }
            var maxKeyId = 1;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].key.id > maxKeyId) {
                    maxKeyId = data[i].key.id;
                }
            }
            result = {
                id: ++maxKeyId,
                name: name,
                customer: customer,
                apartment: appartment
            };
          return result;
        };
        
        var addRecord = function (record, res) {            
            if (!validateParams(record)) {
                logger.logError("Wrong params: " + JSON.stringify(record));
                return null;
            }
            data.push(prepareRecord(record));            
            fs.writeFile(
                dbFilePath, 
                JSON.stringify(data), 
                { flag: 'w+' },
                function (err) {
                    if (err) {
                        logger.logError('Failed saving data to file, data: ' + 
                        JSON.stringify(record));
                        res.redirect('/?message=Post data failed');
                    }                    
                    getDataFromFile(dbFilePath);
                    res.redirect('/');
                }
            ); 
        };
        
        var data = null;
        getDataFromFile(dbFilePath);
        
        var getAppartmentList = function () {
            var result = [];
            var appartments = [];
            for (var i = 0; i < data.length; ++i) {
                appartments.push(data[i].key.apartment);
            }
            for (var i = 0; i < appartments.length; ++i) {
                    var unique = true;
                    for (var j = 0; j < result.length; ++j) {
                            if (appartments[i].id === result[j].id) {
                                    unique = false;
                            }
                    }
                    if (unique) {
                            result.push(appartments[i]);
                    }			
            }
            return result;
        };
        
        var getAppartmentsStat = function () {
            var result = {};
            for (var i = 0; i < data.length; ++i) {
                if (!result[data[i].key.apartment.number]) {
                    result[data[i].key.apartment.number] = 0;
                }
                ++result[data[i].key.apartment.number];
            }
            return result;
        };

	return {
		searchByCustomer: searchByCustomer,
		searchByDate: searchByDate,
		getAll: getAll,
		getAllWorkers: getAllWorkers,
		searchByWorker: searchByWorker,
                addRecord: addRecord,
                getAppartmentList: getAppartmentList,
                getAppartmentsStat: getAppartmentsStat
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
