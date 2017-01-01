var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/:tag?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/index1', routes.views.index2);
	app.get('/index2', routes.views.index2);
	app.get('/index3', routes.views.index3);
	app.get('/index4', routes.views.index4);
	app.get('/index5', routes.views.index5);
	app.get('/about', routes.views.about);

	//app.get('/status',  statusController.status);
	//passportConfig.isAuthenticated,
	/*projects routes*/
	app.get('/project1', routes.views.project1);
	app.get('/project2', routes.views.project2);
	app.get('/project3', routes.views.project3);
	app.get('/project4', routes.views.project4);
	app.get('/project5', routes.views.project5);
	app.get('/project6', routes.views.project6);
	app.get('/project7', routes.views.project7);
	app.get('/project8', routes.views.project8);

};
