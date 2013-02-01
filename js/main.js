//Sets the require.js configuration for your application.
require.config( {

  // 3rd party script alias names (Easier to type "jquery" than "lib/jquery-1.8.2.min")
  paths: {

    // Core Libraries
    "jquery": "lib/jquery",
    "underscore": "lib/lodash",
    'text': 'lib/text',
    "backbone": "lib/backbone",
    "marionette": "lib/backbone.marionette",
    "fetchCache": "lib/backbone.fetch-cache.min",
    "bootstrap": "lib/bootstrap.min",
    "moment": "lib/moment.min"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

    'backbone': {
      'deps': [ 'underscore', 'jquery' ],
      'exports': 'Backbone'  //attaches 'Backbone' to the window object
    },
    'bootstrap': {
      'deps': ['jquery']
    }
  }, // end Shim Configuration
  deps: ['bootstrap']

} );

// Includes File Dependencies
require([ "jquery","backbone","app", "router"], function( $, Backbone, App, Router ) {
  "use strict";

  //Override Marionette to use text templates instead of underscore templates.
  Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    // Marionette expects 'templateId' to be the ID of a DOM element.
    // But with RequireJS, templateId is actually the full text of the template.
    var template = templateId;

    // Make sure we have a template before trying to compile it
    if (!template || template.length === 0){
      var msg = "Could not find template: '" + templateId + "'";
      var err = new Error(msg);
      err.name = 'NoTemplateError';
      throw err;
    }

    return template;
  };

  App.start();

  window.App = App;

  // Instantiates a new Backbone.js Router.
  var router = new Router();

  router.on('all', function(route, a) {
    console.log(route);
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {

    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });
});

