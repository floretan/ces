
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    urlRoot: "http://ces.happypixels.com/api/log_item",
    initialize: function() {
      // Fix small inconsistencies when the client and the server 
      // are off by a few seconds.
      var now = new Date().getTime() / 1000;
      if (this.get('created') > now) {
        this.set('created', now);
      }
    },
    defaults: function() {
      return {
        title: '',
        note: '',
        type: 'log_item'
      };
    }
  });
});
