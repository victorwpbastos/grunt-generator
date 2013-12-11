define(function(require, exports, module){
	var Backbone = require('backbone'),
		{Model} = require('../models/{model}'),
		Config = require('config');

	module.exports = Backbone.Collection.extend({
		model: {Model},
		url: Config.BASE_URL + '/{collection}'
	});
});