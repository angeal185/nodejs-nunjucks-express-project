var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.title = 'Post';
	locals.subtitle = 'Post area';
	locals.filters = {
		post: req.params.post,
		category: req.params.category,
		tag: req.params.tag,
	};
	locals.data = {
		posts: [],
		categories: [],
		tags: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories tags');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});
	
	// Load all tags
	view.on('init', function (next) {

		keystone.list('PostTag').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.tags = results;

			// Load the counts for each tag
			async.each(locals.data.tags, function (tag, next) {

				keystone.list('Post').model.count().where('tags').in([tag.id]).exec(function (err, count) {
					tag.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});
	
	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

		// Load the current tag filter
	view.on('init', function (next) {

		if (req.params.tag) {
			keystone.list('PostTag').model.findOne({ key: locals.filters.tag }).exec(function (err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}
	});
	// Render the view
	view.render('post');
};
