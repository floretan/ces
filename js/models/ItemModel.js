
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    urlRoot: "http://ces.happypixels.com/api/log_item",
    defaults: function() {
      return {
        title: '',
        note: '',
        type: 'log_item'
      };
    }
  });
});
