define([
  'vent',
  'backbone',
  'marionette',
  'text!templates/home.html'
], function (vent, Backbone, Marionette, homeTemplate) {
  "use strict";
  var InboxView = Backbone.Marionette.ItemView.extend({
    id: "home-view",
    template: homeTemplate,
    serializeData: function() {
      return {
        actions: ['Dormi', 'Mangé', 'Souri', 'Fait caca', 'Fait pipi']
      }
    }
  });

  return InboxView;
});
