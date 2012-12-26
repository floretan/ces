define([
  'vent',
  'backbone',
  'marionette',
  '../models/ItemModel',
  '../views/ItemEditView',
  'text!templates/home.html'
], function (vent, Backbone, Marionette, ItemModel, ItemEditView, homeTemplate) {
  "use strict";

  var HomeView = Backbone.Marionette.Layout.extend({
    id: "home-view",
    template: homeTemplate,
    regions: {
      itemEditRegion: '#item-edit-region'
    },
    initialize: function() {
      this.bindTo(vent, "item:add", function(action) {
        console.log(action);
        var item = new ItemModel();

        var editView = new ItemEditView({model: item});

        this.itemEditRegion.show(editView);

        this.$('#add-item-modal').modal('show');

      }, this);
    },
    serializeData: function() {
      return {
        actions: ['Dormi', 'Mangé', 'Souri', 'Fait caca', 'Fait pipi']
      }
    }
  });

  return HomeView;
});
