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
    initialize: function(options) {
      this.app = options.app;

      this.bindTo(vent, "item:add", function(action) {

        var item = new ItemModel({
          action: action
        });

        console.log(item);

        var editView = new ItemEditView({model: item, collection: this.app.itemCollection});

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
