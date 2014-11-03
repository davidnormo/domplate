var jsonfile = require('jsonfile'),
    specs = jsonfile.readFileSync('specs/sections.json'),
    Cleanshave = require('../src/cleanshave'),
    assert = require('chai').assert,
	jsdom = require('jsdom');

describe('Sections', function(){
	// specs.tests = [specs.tests[24]];
    specs.tests.forEach(function(spec) {
		it(spec.name, function(){
			var template = new Cleanshave('<div>'+spec.template+'</div>'),
				result = template.compile();
				// console.log(result);

			jsdom.env('<p>hi</p>', function(errs, window) {
				document = window.document;
				var domplate = eval(result);
				var frag = domplate(spec.data);

				document.body.appendChild(frag);
				var div = document.querySelector('div');
				var old = div.innerHTML;
				div.innerHTML = template.filter(spec.expected);
				assert.equal(old, div.innerHTML, spec.desc);
			});
		});
    });
});