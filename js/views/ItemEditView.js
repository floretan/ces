define([
  'vent',
  'backbone',
  'marionette',
  'text!templates/ItemEdit.html'
], function (vent, Backbone, Marionette, ItemEditTemplate) {
  "use strict";

  var ItemEditView = Backbone.Marionette.ItemView.extend({
    template: ItemEditTemplate,
    events: {
      'click #save-new-item': 'saveNewItem',
      'click #cancel-new-item': 'cancelNewItem',
    },
    saveNewItem: function() {
      this.collection.push(this.model);
      this.model.set({
        action: this.$('[name=action]').val(),
        timestamp: this.$('[name=timestamp]').val(),
        note: this.$('[name=note]').val()
      });

      this.model.save();
      this.$('#add-item-modal').modal('hide');
    },
    cancelNewItem: function() {
      this.model.destroy();
      this.$('#add-item-modal').modal('hide');
    }
  });

  return ItemEditView;
});
