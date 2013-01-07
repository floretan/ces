define([
  'vent',
  'backbone',
  'marionette',
  'text!templates/Toolbar.html'
], function (vent, Backbone, Marionette, ToolbarTemplate) {
  "use strict";

  var ToolbarView = Backbone.Marionette.ItemView.extend({
    template: ToolbarTemplate,
    events: {
      'click #toolbar-refresh-button': 'refresh',
      'click #toolbar-user-logout': 'logout'
    },
    initialize: function(options) {
      this.app = options.app;
    },
    refresh: function() {
      this.app.itemCollection.fetch();
    },
    logout: function() {
      vent.trigger('user:logout');
    }
  });

  return ToolbarView;
});
