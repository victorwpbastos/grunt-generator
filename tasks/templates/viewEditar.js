define(function(require, exports, module){
	var Marionette = require('marionette');

	module.exports = Marionette.ItemView.extend({
		template: '{module}/{model}/editar.tpl'
	});
});