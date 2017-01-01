var keystone = require('keystone');
var Types = keystone.Field.Types;
var todo = new keystone.List('todo');

todo.add({
  name: {type: String},
  completed: {type: Boolean,default: false},
  note: {type: String},
  content: {brief: { type: Types.Html, wysiwyg: true, height: 150 }},
  update_at: {type: Date,default: Date.now()}
});

todo.defaultColumns = 'name, note, update_at, completed';
todo.register();
