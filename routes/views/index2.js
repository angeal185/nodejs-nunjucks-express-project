var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'index2';
	view.render('index2');
	locals.title = 'Index2';
};