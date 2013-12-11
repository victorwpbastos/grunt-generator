module.exports = function(grunt) {

	var writeFile = function(fileType, moduleName, fileName, fileContent) {
		var path;

		if(moduleName === 'app') {
			if(fileType === 'template') {
				path = 'app/' + fileType + 's/' + fileName + '.tpl';
			} else {
				path = 'app/js/' + fileType + 's/' + fileName + '.js';
			}
		} else {
			if(fileType === 'template') {
				path = 'app/js/modules/' + moduleName + '/' + fileType + 's/' + fileName + '.tpl';
			} else {
				path = 'app/js/modules/' + moduleName + '/' + fileType + 's/' + fileName + '.js';
			}
		}
		grunt.file.write(path, fileContent);
		grunt.log.ok(fileType.charAt(0).toUpperCase() + fileType.slice(1) + ' ' + path + ' criado com sucesso!');
	};

	var generate = function(genType, genName, genTemplate) {
		var templates = {},
			moduleName = genName.slice(0, genName.indexOf('/')),
			fileName = genName.substring(genName.indexOf('/') + 1, genName.length);

		grunt.file.expand('tasks/templates/*.js').forEach(function(file) {
			var fileContent = grunt.file.read(file);

			fileContent = fileContent.replace(/{template}/g, moduleName + '/' + fileName);

			if(genType === 'c' || genType === 'collection') {
				fileContent = fileContent.replace(/{model}/g, fileName.slice(0, fileName.lastIndexOf('s')));
				fileContent = fileContent.replace(/{Model}/g, (fileName.charAt(0).toUpperCase() + fileName.slice(1)).slice(0, fileName.lastIndexOf('s')));
				fileContent = fileContent.replace(/{collection}/g, fileName);
			} else {
				fileContent = fileContent.replace(/{model}/g, fileName);
				fileContent = fileContent.replace(/{Model}/g, fileName.charAt(0).toUpperCase() + fileName.slice(1));
			}
			fileContent = fileContent.replace(/{module}/g, moduleName);
			templates[file.split('/')[2].split('.js')[0]] = fileContent;
		});

		if(genType === 'model' || genType === 'm') {
			writeFile('model', moduleName, fileName, templates['model']);
		}

		if(genType === 'collection' || genType === 'c') {
			writeFile('collection', moduleName, fileName, templates['collection']);
		}

		if(genType === 'view' || genType === 'v') {
			writeFile('view', moduleName, fileName, templates['view']);
			if(genTemplate) {
				writeFile('template', moduleName, fileName, templates['template']);
			}
		}

		if(genType === 'template' || genType === 't') {
			writeFile('template', moduleName, fileName, templates['template']);
		}
	};

	grunt.registerTask('generate', generate);
	grunt.registerTask('g', generate);
};
