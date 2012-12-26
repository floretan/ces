define([
  'backbone',
  '../models/ItemModel',
  'text!templates/Item.html'
], function (Backbone, ItemModel, ItemTemplate) {
  return Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    template: ItemTemplate,
    events: {
      "click a.item-delete": "clear"
    },
    clear: function(e) {
      e.preventDefault();
      this.model.destroy();
    }
  });
})