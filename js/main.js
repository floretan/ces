// Sets the require.js configuration for your application.
      require.config( {
  
        // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
        paths: {

            // Core Libraries
            "jquery": "libs/jquery",
            "jquerymobile": "libs/jquery.mobile-1.2.0",
            "underscore": "libs/lodash",
            "backbone": "libs/backbone",
            "localStorage": "libs/backbone.localStorage-min",
            "jqm-config": "libs/jqm-config"
        },

        // Sets the configuration for your third party scripts that are not AMD compatible
        shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            },
            "localStorage": {
                  "deps": [ "backbone"]
            },
            "jquerymobile": {
                  "deps": [ "jqm-config"]
            }

        } // end Shim Configuration

      } );

      // Includes File Dependencies
      require([ "jquery","backbone","router", 'jquerymobile'], function( $, Backbone, Mobile ) {

        // // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
        // $.mobile.linkBindingEnabled = false;

        // // Disabling this will prevent jQuery Mobile from handling hash changes
        // $.mobile.hashListeningEnabled = false;

        // $.mobile.pushStateEnabled = false;
        // $.mobile.ajaxEnabled = false;

        // Instantiates a new Backbone.js Mobile Router
        this.router = new Mobile();

        this.router.on('all', function(route, a) {
            console.log(route);

            this.currentRoute = route;

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

