define(function(require, exports, module){
	var Backbone = require('backbone'),
		Config = require('config');

	module.exports = Backbone.Model.extend({
		urlRoot: Config.BASE_URL + '/{model}',
	});
});