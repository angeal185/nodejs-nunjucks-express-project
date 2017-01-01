var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'index4';
	view.render('index4');
	locals.title = 'Index4';
};