define([
  'vent',
  'backbone',
  '../views/ItemView',
], function (vent, Backbone, ItemView) {
  "use strict";
  var LogView = Backbone.Marionette.CollectionView.extend({
    tagName: "table",
    className: "table",
    itemView: ItemView,
    initialize: function() {
      this.bindTo(this.collection, 'change', this.render);
    },
    onShow: function() {
      setInterval(this.render,60*1000);
    }
  });

  return LogView;
});
