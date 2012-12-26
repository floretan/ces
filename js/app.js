define([
  "vent",
  "backbone",
  "marionette",
  "collections/ItemCollection",
  "views/HomeView"],
function(vent, Backbone, Marionette, ItemCollection, HomeView) {
  "use strict";

  //Instanciate our Application.
  var app = new Marionette.Application();

  // Define the main app regions.
  app.addRegions({
    homeRegion: "#home-region",
  });

  app.addInitializer(function(){

    app.itemCollection = new ItemCollection();

    // Add the desktop.
    app.homeRegion.show(new HomeView({app: app}));

    app.homeRegion.fetch();
  });


  $('body').bind('ajaxError', function(event, XMLHttpRequest, ajaxOptions) {
    if (XMLHttpRequest.status === 401) {
      console.log(XMLHttpRequest.responseText);
      window.location = '../user?destination=/main';
    }
  });

  return app;
});
