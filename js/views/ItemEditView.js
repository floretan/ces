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
      'submit form': 'saveNewItem',
      'click #save-new-item': 'saveNewItem',
    },
    showForm: function() {
      var v = this;
      this.$('.add-form-details').slideDown({
        complete: function() {
          $(this).find('[name=note]').focus();
          $('html').click(function() {
            v.hideForm()
          });
        }
      });
    },
    hideForm: function(e) {
      $('html').unbind('click');
      var v = this;
      setTimeout(function() {
        v.$('.add-form-details').slideUp({
          complete: function() {
            v.render();
          }
        });
      }, 100);
    },
    saveNewItem: function(e) {
      e.preventDefault();

      var item = new ItemModel();

      item.set({
        category: this.$('[name=category]:checked').val(),
        note: this.$('[name=note]').val()
      });

      var v = this;
      item.on("sync", function() {
        v.hideForm();
      });

      item.save({wait: true});

      item.set({created: new Date().getTime()/1000});
      this.collection.unshift(item);
    }
  });

  return ItemEditView;
});
