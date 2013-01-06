define([
  'vent',
  'backbone',
  'marionette',
  '../views/ItemEditView',
  'text!templates/home.html'
], function (vent, Backbone, Marionette, ItemEditView, homeTemplate) {
  "use strict";

  var HomeView = Backbone.Marionette.Layout.extend({
    id: "home-view",
    template: homeTemplate,
    regions: {
      itemEditRegion: '#item-edit-region'
    },
    initialize: function(options) {
      this.app = options.app;
    },
    onRender: function() {
      var editView = new ItemEditView({collection: this.app.itemCollection});

      this.itemEditRegion.show(editView);
    },
    serializeData: function() {
      return {
        actions: ['Dormi', 'Mangé', 'Souri', 'Fait caca', 'Fait pipi']
      }
    }
  });

  return HomeView;
});
