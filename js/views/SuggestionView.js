define([
  'vent',
  'backbone',
  'marionette',
  '../models/ItemModel',
  'text!templates/Suggestion.html'
], function (vent, Backbone, Marionette, ItemModel, SuggestionTemplate) {
  return Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    className: 'suggestion',
    template: SuggestionTemplate,
    initialize: function() {
      this.$el.addClass(this.model.get('category'));
    },
    events: {
      'click': 'copy',
      'click button': 'choose',
    },
    copy: function(e) {
      e.preventDefault();
      vent.trigger('suggestion:copy', this.model);
    },
    choose: function(e) {
      e.preventDefault();
      vent.trigger('suggestion:choose', this.model);
    }
  });
})
