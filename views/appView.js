var keysModule = require('./../models/keysModule.js');
var userModule = require('./../models/userModule.js');

module.exports = (function () {
    var searchRecord = function (params) {
        // TODO: add serach by both params in a time
        var data = [];
        if (params.customer_name) {
            data = keysModule.searchByCustomer(params.customer_name);
        } else if (params.worker_id) {
            data = keysModule.searchByWorker(params.worker_id);
        } else {
            data = [];
        }
        if (params.limit && parseInt(params.offset) > -1) {
          var result = [];
          for (var i = params.offset; i < (parseInt(params.offset) + parseInt(params.limit)); ++i) {
            if (data[i]) {
              result.push(data[i]);
            }            
          }
          data = result;
        }
        return data;
    };
    
    var addRecord = function (record) {
        var isOk = keysModule.addRecord(record);
        return (isOk) ? { success: true } : { success: false };
    };
    
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
              }
            };  
    };

    var authenticate = function (params) {
        var session = userModule.authenticate(params.login, params.pw);
        delete session.user_id;
        delete session.id;
        return session;
    };

    var hello = function (params) {
      if (userModule.authorize(params.token)) {
        return 'hi';
      }
      return 'authorization failed';
    }
    
    return {
        searchRecord: searchRecord,
        addRecord: addRecord,
        getChartData: getChartData,
        authenticate: authenticate,
        hello: hello        
    };
})();