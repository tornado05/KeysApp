var keysModule = require('./../models/keysModule.js');

module.exports = (function() {
	
	var getPage = function (params) {
		return '<html>' + getPageHead() +
		'<body>' + 
		getPageHeader() + 
		getMain(params) +
                getAjaxDemo() +
		getPageFooter() +                
                getLibs() +
                getChartScript() +
		'</body></html>';
	};
        
        var getAjaxDemo = function () {
           return '<button id="ajax-demo">Ajax Demo</button>' + 
                   '<div id="ajax-result-demo"></div>';
        };
        
        var getLibs = function () {
            return [
                '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart.min.js"></script>',
                '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>',
                '<script type="text/javascript" src="ajax_demo.js"></script>'
            ].join('');
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
                getMessage(params) +         
		getSearchForm() +
		getAllKeysTable(params) +
                getCharts() +
                getRecordForm() +                
		'</main>';
	};
        
        var getCharts = function () {
            return [
                '<canvas id="appartment-chart" width="400" height="400"></canvas>'                
            ].join('');
        };
        
        var getChartScript = function () {
            return [
                '<script>',
                'var ctx = document.getElementById("appartment-chart");',
                'var myChart = new Chart(ctx, JSON.parse(\'' + JSON.stringify(getChartData()) + '\'));',
                '</script>'
            ].join('');
        };
        
        // TODO: real data parsing should be here, this is only a mock
        var getChartData = function () {
            var appartments = keysModule.getAppartmentList();
            var appartmentsStat = keysModule.getAppartmentsStat()
            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            for (var i = 0; i < appartments.length; ++i) {
                labels.push(appartments[i].number);
                dataStat.push(appartmentsStat[appartments[i].number]); 
                backGroundColors.push('rgba(0, 255, 0, 0.8)');
            }
            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Datasheet 1",
                          data: dataStat,
                          backgroundColor: backGroundColors
                      }
                  ]
              },
              options: {
                  responsive: false,
                  scales: {
                      yAxes: [
                          {
                              ticks: {
                                  beginAtZero: true
                              }
                          }
                      ],
                      xAxes: [
                          {
                              display: false
                          }
                      ]
                  }
              }
            };                       
        };
        
        var getMessage = function (params) {
            if (!params) {
                return '';
            } 
            return (params.message) ? '<div id="message">' + 
                    params.message + '</div>' : '';
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
                   '<input type="text" name="worker_name"/>' + 
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