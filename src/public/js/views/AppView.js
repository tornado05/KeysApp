var app = app || {};

app.AppView = Backbone.View.extend({

	el: "#backbone-app",

	template: templates.get('Main'),

	version: '0.0.0',

	workers: new app.Workers(),

	record: new app.Record(),

	events: {
		'click #save-button': '_saveHandler'
	},

	initialize() {
		// console.log('constructor');
		// console.log(new app.Workers({test: "test"}));
		// console.log("=====================================================================================");
		// var worker = new app.Workers({id: 1, worker_name: "Maria Pavlovna"});
		// console.log(worker);
		// console.log(worker.get("id"));
		// console.log(worker.set("id", 2));
		// console.log(worker.get("id"));
		// console.log(worker.getName());
		console.log(this.record);		
		this.render();
		this.listenTo(this.record, 'change', this.render);
		this.record.fetch();		
	},

	render: function () {
		console.log('render');
		console.log(this.record);
		this.$el.html(this.template({version: this.version, obj: this.record}));
	},

	_saveHandler: function () {
		this.record.save();
	}
});