define([
  'vent',
  'backbone',
  '../views/ItemView',
  'moment',
  'collectionSubset',
], function (vent, Backbone, ItemView, moment) {
  "use strict";
  var LogView = Backbone.Marionette.CollectionView.extend({
    tagName: "table",
    className: "table",
    itemView: ItemView,
    events: {
      'click': 'updateSelection',
    },
    initialize: function(options) {
      var start = this.start = moment().subtract('d', 1).startOf('day');
      var end = this.end = moment().endOf('day');

      this.subset = new Backbone.CollectionSubset({
        parent: options.app.itemCollection,
        filter: function(item) {
          var timestamp = item.get('created');
          return timestamp > start.unix() && timestamp < end.unix();
        }
      });

      this.collection = this.subset.child;

      this.bindTo(this.collection, 'change', this.render);
    },
    updateSelection: function() {
      this.start.subtract('d', 1);
      this.subset.refresh();
    }
  });

  return LogView;
});
