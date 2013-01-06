define([
  'backbone',
  'marionette',
  '../models/ItemModel',
  'moment',
  'text!templates/Item.html'
], function (Backbone, Marionette, ItemModel, moment, ItemTemplate) {
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
    },
    serializeData: function() {
      var data = this.model.toJSON();
      // The displayed time.
      data.time = moment.unix(data.created).calendar();

      return data;
    }
  });
})
