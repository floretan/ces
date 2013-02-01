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

      this.bindTo(this.app.itemCollection, 'reset', this.refreshComplete, this);
    },
    refresh: function() {
      this.$('#toolbar-refresh-button i').addClass('icon-spin');
      this.app.itemCollection.fetch();
    },
    refreshComplete: function(e) {
      this.$('#toolbar-refresh-button i').removeClass('icon-spin'); 
    },
    logout: function() {
      vent.trigger('user:logout');
    }
  });

  return ToolbarView;
});
