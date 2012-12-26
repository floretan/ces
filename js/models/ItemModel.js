
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      var now = new Date().getTime();
      return {
        action: '',
        timestamp: now,
        comment: ''
      };
    }
  });
});