var app = app || {};

app.Workers = Backbone.Model.extend({
	url: "/workers",

	initialize: function(options) {
		console.log("model initialize");
		console.log(options);
		this.set("init_test", "init test");
		console.log(this.get("init_test"));
	},

	getName: function () {
		return "Worker Name: " + this.get("worker_name");
	}
});

// var obj = {
// 	name: "test"	
// };

// obj.name
// obj["name"]

// function get(name) {
// 	return this.attributes[name];
// }