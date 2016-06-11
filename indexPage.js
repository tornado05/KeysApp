var keysModule = require('./keysModule.js');

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
		return '<head><title>No way</title></head>';
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
		return '<form method="POST"><label>Enter customer name</label><input type="text" name="customer_name"/><input type="submit"/></form>';
	};
	
	var getViewData = function (params) {		
		if (!params) {
			return keysModule.getAll();
		} 
		if (params.customer_name) {
			return keysModule.searchByCustomer(params.customer_name);
		}
	}
	
	return {
		getPage: getPage
	};
})();