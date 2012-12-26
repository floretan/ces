define([
  "vent",
  "backbone"
], function(vent, Backbone) {
  "use strict";

  // Extends Backbone.Router
  var Router = Backbone.Router.extend({

    // The Router constructor
    initialize: function() {

      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
    },

    // Backbone.js Routes
    routes: {

      // When there is no hash bang on the url, the home method is called
      "": "home",
      "new/:action": "addNewItem",
      '*path':  'defaultRoute'
    },

    // Home method
    home: function() {

    },
    addNewItem: function(action) {
      vent.trigger('item:add', action);
    },
    defaultRoute: function(path) {
      console.log(path);
    }
  });

  // Returns the Router class
  return Router;
} );
