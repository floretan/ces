define(['backbone', '../models/ItemModel', 'localStorage'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
//    localStorage: new Backbone.LocalStorage("ItemCollection"),
    url: "http://ces.happypixels.com/api/log_item",
    comparator: function(todo) {
      return - todo.get('created');
    }
  });
})
