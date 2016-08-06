var app = app || {};

app.AppView = Backbone.View.extend({

	el: "#backbone-app",

	template: templates.get('Main'),

	version: '0.2.1',

	initialize() {
		console.log('constructor');
		this.render();
	},

	render: function () {
		console.log('render');
		this.$el.html(this.template({version: this.version}));
	}
});