define([
  'backbone',
  'marionette',
  '../models/ItemModel',
  'text!templates/Item.html'
], function (Backbone, Marionette, ItemModel, ItemTemplate) {
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
    onShow: function() {
      // @todo: somehow this doesn't work as it should.
      this.$('time.timeago').timeago();
    },
    serializeData: function() {
      var data = this.model.toJSON();
      // The displayed time.
      data.time = $.timeago(parseInt(data.timestamp));

      // The ISO timestamp used by timeago.
      data.isoTimestamp = new Date(parseInt(data.timestamp)).toISOString();

      return data;
    }
  });
})
