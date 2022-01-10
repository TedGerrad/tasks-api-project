var express = require('express');
var bodyParser = require('body-parser');
const Joi = require('joi');
module.express = function(){
	console.log('init express...');
	Joi.validate(request, schema, { abortEarly: false });
	var app = express();
	app.use(bodyParser.json());
	app.use(function(req, res, next){
		res.status(404);
		try {
			return res.json('Not found');
		} catch(e) {
			console.error('404 set header after sent');
		}
	});
	return app;
}; 