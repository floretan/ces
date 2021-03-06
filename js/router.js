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
      '*path':  'defaultRoute'
    },

    // Home method
    home: function() {

    },
    defaultRoute: function(path) {
      console.log(path);
    }
  });

  // Returns the Router class
  return Router;
} );
