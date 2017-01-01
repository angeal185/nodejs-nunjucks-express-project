var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'index1';
	view.render('index1');
	locals.title = 'Index1';
};