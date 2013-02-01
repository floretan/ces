define(['backbone', '../models/ItemModel', 'fetchCache'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
    url: "http://ces.happypixels.com/api/log_item",
    comparator: function(todo) {
      return - todo.get('created');
    }
  });
})
