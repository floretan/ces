define([
  'vent',
  'backbone',
  '../views/ItemView',
], function (vent, Backbone, ItemView) {
  "use strict";
  var LogView = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    itemView: ItemView
  });

  return LogView;
});
