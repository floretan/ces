define(['backbone', '../models/ItemModel', 'localStorage'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
    localStorage: new Backbone.LocalStorage("ItemCollection"),
    comparator: function(todo) {
      return - todo.get('timestamp');
    }
  });
})