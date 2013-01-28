define(['backbone', '../models/ItemModel', 'localStorage'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
  });
})
