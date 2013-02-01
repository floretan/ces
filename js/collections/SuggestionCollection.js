define(['backbone', '../models/ItemModel'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
  });
})
