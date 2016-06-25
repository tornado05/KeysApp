var _ = require('lodash');
var keysTests = require('./keysModule.js');

_.each(keysTests, function (test) {
    test();    
});




