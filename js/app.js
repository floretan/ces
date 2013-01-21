define([
  "vent",
  "backbone",
  "marionette",
  "collections/ItemCollection",
  "views/HomeView",
  "views/LogView",
  "views/ToolbarView",
  "views/LoginView"],
function(vent, Backbone, Marionette, ItemCollection, HomeView, LogView, ToolbarView, LoginView) {
  "use strict";

  //Instanciate our Application.
  var app = new Marionette.Application();

  // Define the main app regions.
  app.addRegions({
    toolbarRegion: "#toolbar-region",
    homeRegion: "#home-region",
    logRegion: "#log-region",
    loginRegion: "#login-region",
    footerRegion: "#footer-region"
  });

  app.addInitializer(function(){

    app.itemCollection = new ItemCollection();

    app.toolbarRegion.show(new ToolbarView({app: app}));

    // Add the main screen.
    app.homeRegion.show(new HomeView({app: app}));

    // Add the log view.
    app.logRegion.show(new LogView({collection: app.itemCollection}));

    app.itemCollection.fetch();

    $('body').bind('ajaxError', function(event, XMLHttpRequest, ajaxOptions) {
      if (XMLHttpRequest.status === 401) {
        console.log(XMLHttpRequest.responseText);
        $(app.loginRegion.el).show();
        app.loginRegion.show(new LoginView());
      }
    });

    vent.bindTo(vent, "login:success", function() {
      $(app.loginRegion.el).hide();
      app.loginRegion.close();
    });

    setInterval(function() {
      vent.trigger('timer:minute');
    }, 60*1000);
  });

  return app;
});
