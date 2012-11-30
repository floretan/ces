// Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", "views/AppView" ], function( $, Backbone, AppView ) {

    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend({

        // The Router constructor
        initialize: function() {

            // Instanciate our Application View.
            var App = new AppView();

            this.currentView = null;

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            // When #category? is on the url, the category method is called
            "detail": "detail",
            "detail/:type": "detail",
            '*path':  'defaultRoute'
        },

        // Home method
        home: function() {
            
            // Programatically changes to the categories page
            $.mobile.changePage( "#home" , { reverse: false, changeHash: false, transition: "slidedown" } );
        },

        // Category method that passes in the type that is appended to the url hash
        detail: function(type) {
            $.mobile.changePage( "#detail" , { reverse: false, changeHash: false, transition: "slideup" } );

            // // Stores the current Category View  inside of the currentView variable
            // var currentView = this[ type + "View" ];

            // // If there are no collections in the current Category View
            // if(!currentView.collection.length) {

            //     // Show's the jQuery Mobile loading icon
            //     $.mobile.loading( "show" );

            //     // Fetches the Collection of Category Models for the current Category View
            //     currentView.collection.fetch().done( function() {

            //         // Programatically changes to the current categories page
            //         $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );
    
            //     } );

            // }

            // // If there already collections in the current Category View
            // else {

            //     // Programatically changes to the current categories page
            //     $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

            // }

        },
        defaultRoute: function(path) {
            $.mobile.changePage( "#" + path , { reverse: false, changeHash: false, transition: "flip" } );
        }
    });

    // Returns the Router class
    return CategoryRouter;

} );
