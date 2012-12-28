define([
  'vent',
  'backbone',
  'marionette',
  'text!templates/Login.html'
], function (vent, Backbone, Marionette, LoginTemplate) {
  "use strict";

  var LoginView = Backbone.Marionette.ItemView.extend({
    template: LoginTemplate,
    events: {
      'submit form': 'doLogin',
      'click #login-submit': 'doLogin',
    },
    doLogin: function(e) {
      e.preventDefault();
//$.ajaxSetup({
//  contentType: 'json',
//});
      $.post('http://ces.happypixels.com/api/user/login', {
        username: this.$('[name=username]').val(),
        password: this.$('[name=password]').val(),
      });
    }
  });

  return LoginView;
});
