define(['backbone', '../collections/ItemCollection', '../views/ItemView'], function (Backbone, ItemCollection, ItemView) {
  /**
   * AppView definition.
   */
  return Backbone.View.extend({
    el: $('#home'),
    events: {
      'click #openAddForm': 'open_add_form', 
      'click #add-item': 'create_item',
      'click #delete-all-items': 'delete_all_items'
    },
    initialize: function() {
      this.collection = new ItemCollection;

      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('all', this.render, this);
      this.collection.on('change', this.refresh, this);

      this.collection.fetch();
    },
    open_add_form: function(e) {
      this.$( "#popupAddForm" ).popup("open");
      e.preventDefault();
    },
    create_item: function(e) {
      e.preventDefault();
      this.collection.create({
        title: "Tea ",
        amount: 100 * Math.random().toFixed(2)
      });
    },
    delete_all_items: function(e) {
      e.preventDefault();
      this.collection.clear();
    },
    addOne: function(item) {
      var el = new ItemView({ model: item }).render().el;

      this.$('ul#item-list').append(el);
    },
    addAll: function() {
      this.collection.each(this.addOne, this);
      this.refresh();
    },
    refresh: function() {
      this.$('ul#item-list').listview('refresh');
    }
  });
})