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
      'click #toolbar-user-logout': 'logout'
    },
    initialize: function(options) {
      this.app = options.app;
    },
    logout: function() {
      vent.trigger('user:logout');
    }
  });

  return ToolbarView;
});
