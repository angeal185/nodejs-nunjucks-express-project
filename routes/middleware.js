var _ = require('lodash');


/**
	Initialises the standard view locals
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'index', href: '/' },
		{ label: 'Index1', key: 'index1', href: '/index1' },
		{ label: 'Index2', key: 'index2', href: '/index2' },
		{ label: 'Index3', key: 'index3', href: '/index3' },
		{ label: 'Index4', key: 'index4', href: '/index4' },
		{ label: 'Index5', key: 'index5', href: '/index5' },
		{ label: 'About', key: 'about', href: '/about' },
		{ label: 'Project1', key: 'project1', href: '/project1' },
		{ label: 'Project2', key: 'project2', href: '/project2' },
		{ label: 'Project3', key: 'project3', href: '/project3' },
		{ label: 'Project4', key: 'project4', href: '/project4' },
		{ label: 'Project5', key: 'project5', href: '/project5' },
		{ label: 'Project6', key: 'project6', href: '/project6' },
		{ label: 'Project7', key: 'project7', href: '/project7' },
		{ label: 'Project8', key: 'project8', href: '/project8' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
