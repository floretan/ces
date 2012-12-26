define([
  'vent',
  'backbone',
  'marionette',
  '../models/ItemModel',
  'text!templates/ItemEdit.html'
], function (vent, Backbone, Marionette, ItemModel, ItemEditTemplate) {
  "use strict";

  var ItemEditView = Backbone.Marionette.ItemView.extend({
    template: ItemEditTemplate,
    events: {
      'click label': 'showForm',
      'click #save-new-item': 'saveNewItem',
      'click #cancel-new-item': 'hideForm',
    },
    showForm: function() {
      this.$('.add-form-details').slideDown();
    },
    hideForm: function() {
      this.$('.add-form-details').slideUp();
    },
    saveNewItem: function() {
      var item = new ItemModel();

      this.collection.unshift(item);
      item.set({
        category: this.$('[name=category]:checked').val(),
        note: this.$('[name=note]').val()
      });

      item.save();
      this.hideForm();
      vent.trigger('add-form:reset');
    }
  });

  return ItemEditView;
});
