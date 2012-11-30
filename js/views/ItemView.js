define(['backbone', '../models/ItemModel'], function (Backbone, ItemModel) {
  return Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    events: {
      "click a.item-delete": "clear"
    },
    render: function() {
      this.$el.html('<a href="#detail/' + this.model.cid + '">' + this.model.get('title') + ' ' + this.model.get('amount') + 
                        '</a> <a href="#" class="item-delete">x</a>');
      return this;
    },
    clear: function(e) {
      e.preventDefault();
      this.model.destroy();
    }
  });
})