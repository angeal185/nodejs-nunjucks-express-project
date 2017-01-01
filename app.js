// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

keystone.init({
	'name': 'nunjucksWebsite',
	'brand': 'nunjucksWebsite',

	'stylus': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'views',
	'view engine': 'njk',
	'custom engine': cons.nunjucks,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));
keystone.set('nav', {
	posts: ['posts', 'post-categories', 'post-tags'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	todo: 'todo',
	contacts: 'contacts',
	users: 'users',
	lists: 'lists',
});

keystone.start();
