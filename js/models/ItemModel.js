
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      var now = new Date().getTime();
      return {
        title: '',
        timestamp: now,
        note: '',
        type: 'log_item'
      };
    }
  });
});
