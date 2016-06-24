var keysModule = require('./../models/keysModule.js');

module.exports = (function() {
	
	var getPage = function (params) {
		return '<html>' + getPageHead() +
		'<body>' + 
		getPageHeader() + 
		getMain(params) +
		getPageFooter() +
		'</body></html>';
	};
	
	var getPageHead = function () {
		return '<head>' +
		'<title>No way</title>' +
		'<link rel="stylesheet" href="http://localhost:3000/style.css"/>' +
		'</head>';
	};
	
	var getPageHeader = function () {
		return '<header></header>';
	};
	
	var getPageFooter = function () {
		return '<footer></footer>';
	};
	
	var getMain = function (params) {
		return '<main><h1>Keys</h1>' +
		getSearchForm() +
		getAllKeysTable(params) +
                getRecordForm() +
		'</main>';
	};
	
	var getAllKeysTable = function (params) {
		var data = getViewData(params);
		if (!data.length) {
			return 'Nothing found';
		}	
		var result = "<tr><td>Date</td><td>Id key</td><td>Worker Name</td><td>Customer Name</td><td>Appartment Number</td></tr>";
		for(var i = 0; i < data.length; ++i) {
			result += "<tr>" +
			"<td>" + data[i].date + "</td>" +
			"<td>" + data[i].id + "</td>" +
			"<td>" + data[i].worker.name + "</td>" +
			"<td>" + data[i].key.customer.name + "</td>" +
			"<td>" + data[i].key.apartment.number + "</td>" +
			"</tr>";
		}
		return '<table border="1">' + result + '</table>';
	};
	
	var getSearchForm = function () {		
		return '<form method="GET" action="search">' + 
                       '<input type="hidden" name="action" value="search"/>' + 
                       '<label>Select worker</label>' + 
                       getWorkersSelect(keysModule.getAllWorkers()) +
		       '<label>Enter customer name</label>' + 
                       '<input type="text" name="customer_name"/>' + 
                       '<input type="submit"/>' + 
                       '</form>';
	};
        
        var getRecordForm = function () {
            return '<form method="POST" action="record">' +
                   '<input type="hidden" name="action" value="add"/>' + 
                   '<label>Enter customer name</label>' +                    
                   '<input type="text" name="customer_name"/>' + 
                   '<label>Enter worker name</label>' +                    
                   '<input type="text" name="word_name"/>' + 
                   '<label>Enter appartment number</label>' +                    
                   '<input type="text" name="appartment_number"/>' + 
                   '<label>Enter key name</label>' +                    
                   '<input type="text" name="key_name"/>' + 
                   '<input type="submit"/>' + 
                   '</form>';
        };
	
	var getWorkersSelect = function (workers) {
		var options = '';
		for (var i = 0; i < workers.length; ++i) {
			options += '<option value="' + workers[i].id + '">' + workers[i].name + '</option>';
		}
		return (options.length) ? '<select name="worker_id">' + options + '</select>' : '';
	};
	
	var getViewData = function (params) {
            console.log(params);
		if (!params) {
		    return keysModule.getAll();
		} 
		if (params.customer_name && params.action === 'search') {
			return keysModule.searchByCustomer(params.customer_name);
		} else if (params.worker_id && params.action === 'search') {
			return keysModule.searchByWorker(params.worker_id);
		} else if (params.customer_name && params.action === 'add') {
                    keysModule.addRecord(params);
                    return keysModule.getAll();
                } else {
                    return keysModule.getAll();
		}
	};
	
	return {
		getPage: getPage
	};
})();