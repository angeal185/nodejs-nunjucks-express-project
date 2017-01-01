var keystone = require('keystone');
var Types = keystone.Field.Types;
var Contacts = new keystone.List('Contacts');

Contacts.add({
	name: { type: Types.Name, required: true, index: true },
	age: { type: Types.Date, required: false, index: true },
	gender: { type: Types.Select, options: 'Male, Female', initial: true },
	location: { type: Types.Location, required: false, index: true },
	phone: { type: Types.Number, required: false, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	relation: { type: Types.Select, options: 'Friend, Family, Business, Other', initial: true },
	notes: {brief: { type: Types.Html, wysiwyg: true, height: 150 }},
	update_at: {type: Date,default: Date.now()}
});

Contacts.defaultColumns = 'name, email, phone, relation, update_at';
Contacts.register();