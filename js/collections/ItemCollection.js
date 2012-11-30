define(['backbone', '../models/ItemModel', 'localStorage'], function (Backbone, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
    localStorage: new Backbone.LocalStorage("ItemCollection"),
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: function(todo) {
      return todo.get('order');
    },
    clear: function(options) {
      options || (options = {});
      while (this.length > 0) {
        this.at(0).destroy(options);
      }
      if (!options.silent) {
        this.trigger('clear', this, options);
      }
      return this;
    } 
  });
})