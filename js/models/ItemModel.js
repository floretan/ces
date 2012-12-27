
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      return {
        title: '',
        note: '',
        type: 'log_item'
      };
    }
  });
});
