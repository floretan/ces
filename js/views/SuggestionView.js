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
      'click': 'choose',
    },
    choose: function() {
      vent.trigger('suggestion:choose', this.model);
    }
  });
})
