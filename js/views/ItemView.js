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

      var created = moment.unix(data.created);

      // Display time ago for the past 12 hours, or calendar format for older items.
      if (moment().diff(created, 'hours') > 12) {
        data.time = created.calendar();
      }
      else {
        data.time = created.fromNow();
      }

      return data;
    }
  });
})
