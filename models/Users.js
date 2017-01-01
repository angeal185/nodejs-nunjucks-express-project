var keystone = require('keystone');
var Types = keystone.Field.Types;
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	age: { type: Types.Date, required: false, index: true },
	gender: { type: Types.Select, options: 'Male, Female', initial: true },
	location: { type: Types.Location, required: false, index: true },
	phone: { type: Types.Number, required: false, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	update_at: {type: Date,default: Date.now()}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });



User.schema.methods.wasActive = function () {
	this.lastActiveOn = new Date();
	return this;
}
/**
 * Registration
 */
User.track = true;
User.defaultColumns = 'name, email, isAdmin, update_at';
User.register();
