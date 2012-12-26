define([
  'backbone',
  '../models/ItemModel',
  'text!templates/Item.html'
], function (Backbone, ItemModel, ItemTemplate) {
  return Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'item clearfix',
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