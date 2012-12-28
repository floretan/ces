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

      $(window).resize(this.onShow);
      this.bindTo(vent, 'add-form:reset', this.onRender, this);
    },
    onRender: function() {
      var editView = new ItemEditView({collection: this.app.itemCollection});

      this.itemEditRegion.show(editView);
    },
    onShow: function() {
      $('body').css('margin-top', $('#home-region').height() - 1);
    },
    serializeData: function() {
      return {
        actions: ['Dormi', 'Mangé', 'Souri', 'Fait caca', 'Fait pipi']
      }
    }
  });

  return HomeView;
});
