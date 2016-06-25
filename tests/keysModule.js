var keysModule = require('./../models/keysModule.js');

module.exports = (function () {
    var test1 = function () {
        console.log("Test 1");
        var actualResult = keysModule.searchByCustomer('keys test1');
        if (actualResult.length === 1) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.searchByCustomer should return list with 1 element");
            return false;
        }
    };
    
    var test2 = function () {
        console.log("Test 2");
        var actualResult = keysModule.searchByCustomer('keys testZ');
        if (actualResult.length === 0) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.searchByCustomer should return empty list");
            return false;
        }
    };
    
    var test3 = function () {
        console.log("Test 3");
        var actualResult = keysModule.getAll();
        if (actualResult.length === 2) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAll should return list with two elements");
            return false;
        }
    };
    
    var test4 = function () {
        console.log("Test 4");
        var actualResult = keysModule.getAllWorkers();
        if (actualResult.length === 2) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAllWorkers should return list with 2 elements");
            return false;
        }
    };
    
    var test5 = function () {
        console.log("Test 5");
        var EXPECTED_WORKER_NAME = "keys test1";
        var actualResult = keysModule.getAllWorkers();
        if (actualResult[0].name === EXPECTED_WORKER_NAME) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAllWorkers first worker should have correct name - " + EXPECTED_WORKER_NAME);
            return false;
        }
    };
    
    return {
      test1: test1,
      test2: test2,
      test3: test3,
      test4: test4,
      test5: test5
    };
})();

