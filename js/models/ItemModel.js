
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      return {
        amount: 0,
        title: "Coffee"
      };
    }
  });
});