define([
  'vent',
  'backbone',
  'marionette',
  'text!templates/ItemEdit.html'
], function (vent, Backbone, Marionette, ItemEditTemplate) {
  "use strict";

  var ItemEditView = Backbone.Marionette.ItemView.extend({
    template: ItemEditTemplate
  });

  return ItemEditView;
});
