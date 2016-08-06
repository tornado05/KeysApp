var fs = require('fs');
var logger = require('./../services/Logger.js');
var Record = require('./Record.js');

module.exports = (function () {            
        
    var dbFilePath = './data/data.json';

    var getDataFromFile = function (path) {
        try{
            var result = fs.readFileSync(path, 'utf8');
            var records = JSON.parse(result)
            var res = [];
            for (var i = 0; i < records.length; ++i) {
                res.push(new Record(records[i]));
            }             
            return res;           
            //return JSON.parse(result);
        } catch(e) {
            logger.logError("Can't read from file");
            return [];
        }            
    };
	
	var searchByCustomer = function (customerName) {		
		// All coll stuff find here
		var result = [];
		var expression = new RegExp("^" + customerName + "(.*)");
		for(var i = 0; i < data.length; ++i) {
            var customer = data[i].getCustomer();
            if(customer.getName().search(expression) > -1) {
				result.push(data[i].serialize());
			}
		}
		return result;
	};
	
	var searchByWorker = function (id) {		
		var result = [];
		for (var i = 0; i < data.length; ++i) {
            var worker = data[i].getWorker();
			if (worker.getId() === parseInt(id)) {
				result.push(data[i].serialize());
			}
		}
		return result;
	};
	
	var searchByDate = function (date) {
		var result = [];
		for(var i = 0; i < data.length; ++i) {
			if(data[i].getDate() === Date.parse(date)) {
				result.push(data[i].serialize());
			}
		}
		return result;
	};
	
	var getAllWorkers = function () {
		var result = [];
		var workers = [];
        for (var i = 0; i < data.length; ++i) {
		    workers.push(data[i].getWorker());
		}
		for (var i = 0; i < workers.length; ++i) {
			var unique = true;
			for (var j = 0; j < result.length; ++j) {
				if (result[j] && workers[i].getId() === result[j].getId()) {
					unique = false;
				}
			}
			if (unique) {
				result.push(workers[i]);
			}			
		}
        
		return serializeOutput(result);
	};

    // TODO: this shoul be in view
    var serializeOutput = function (result) {
        var res = [];
        for (var i = 0; i < result.length; ++i) {
            res.push(result[i].serialize());
        }
        return res;
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
                var customer = data[i].getCustomer();
                if (customer.getName() === name) {
                    result = customer;
                }
            }
            if (result) {
                return result.serialize();
            }
            var maxCustomerId = 1;
            for(var i = 0; i < data.length; ++i) {
                var customer = data[i].getCustomer();
                if (customer.getId() > maxCustomerId) {
                    maxCustomerId = customer.getId();
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
                var worker = data[i].getWorker();
                if (worker.getName() === name) {
                    result = worker;
                }
            }
            if (result) {
                return result.serialize();
            }

            var maxWorkerId = 1;
            for(var i = 0; i < data.length; ++i) {
                var worker = data[i].getWorker();
                if (worker.getId() > maxWorkerId) {
                    maxWorkerId = worker.getId();
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
                var apartment = data[i].getAppartment();
                if (apartment.getNumber() === parseInt(number)) {
                    result = apartment;
                }
            }
            if (result) {
                return result.serialize();
            }
            var maxApartmentId = 1;
            for(var i = 0; i < data.length; ++i) {
                var apartment = data[i].getAppartment();
                if (apartment.getId() > maxApartmentId) {
                    maxApartmentId = apartment.getId();
                }
            }
            return {
                id: ++maxApartmentId,
                number: number
            };
        };
        
        var getKeyByParams = function (name, customer, appartment) {
            var result = null;
            for(var i = 0; i < data.length; ++i) {
                var recordAppartment = data[i].getAppartment();
                var recordCustomer = data[i].getCustomer();
                if (data[i].getKeyName() === name && 
                    recordCustomer.getId() === customer.id &&
                    recordAppartment.getId() === appartment.id) {
                    result = {
                        id: data[i].getKeyId(),
                        name: data[i].getKeyName(),
                        customer: customer,
                        apartment: appartment
                    };
                }
            }
            if (result) {
                return result;
            }
            var maxKeyId = 1;
            for(var i = 0; i < data.length; ++i) {
                if (data[i].getKeyId() > maxKeyId) {
                    maxKeyId = data[i].getKeyId();
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
        
        var addRecord = function (record) { 
            if (!validateParams(record)) {
                logger.logError("Wrong params: " + JSON.stringify(record));
                return null;
            }
            dataToSave = serializeOutput(data);
            dataToSave.push(prepareRecord(record));
            try {
                fs.writeFileSync(
                    dbFilePath, 
                    JSON.stringify(dataToSave), 
                    { flag: 'w+' }
                );   
                data = getDataFromFile(dbFilePath);
            } catch(e) {
                logger.logError('Failed saving data to file, data: ' + 
                        JSON.stringify(record));
                return false;
            }
            return true;
        };
        
        var data = getDataFromFile(dbFilePath);
        
        var getAppartmentList = function () {
            var result = [];
            var appartments = [];
            for (var i = 0; i < data.length; ++i) {
                appartments.push(data[i].getAppartment());
            }
            for (var i = 0; i < appartments.length; ++i) {
                    var unique = true;
                    for (var j = 0; j < result.length; ++j) {
                            if (appartments[i].getId() === result[j].getId()) {
                                    unique = false;
                            }
                    }
                    if (unique) {
                            result.push(appartments[i]);
                    }			
            }
            return serializeOutput(result);
        };
        
        var getAppartmentsStat = function () {
            var result = {};
            for (var i = 0; i < data.length; ++i) {
                var appartment = data[i].getAppartment();
                if (!result[appartment.getNumber()]) {
                    result[appartment.getNumber()] = 0;
                }
                ++result[appartment.getNumber()];
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
