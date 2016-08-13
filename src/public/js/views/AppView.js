var app = app || {};

app.AppView = Backbone.View.extend({

	el: "#backbone-app",

	template: templates.get('Main'),

	version: '0.0.0',

	workers: new app.Workers(),

	initialize() {
		console.log('constructor');
		console.log(new app.Workers({test: "test"}));
		console.log("=====================================================================================");
		var worker = new app.Workers({id: 1, worker_name: "Maria Pavlovna"});
		console.log(worker);
		console.log(worker.get("id"));
		console.log(worker.set("id", 2));
		console.log(worker.get("id"));
		console.log(worker.getName());
		this.render();
	},

	render: function () {
		console.log('render');
		this.$el.html(this.template({version: this.version}));
	}
});