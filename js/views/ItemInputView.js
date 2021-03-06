define([
  'vent',
  'backbone',
  'marionette',
  '../models/ItemModel',
  '../collections/SuggestionCollection',
  '../views/SuggestionView',
  'text!templates/ItemInput.html',
  'text!templates/Loader.html'
], function (vent, Backbone, Marionette, ItemModel, SuggestionCollection, SuggestionView, ItemInputTemplate, LoaderTemplate) {
  return Backbone.Marionette.CompositeView.extend({
    template: ItemInputTemplate,
    className: 'inactive',
    itemView: SuggestionView,
    initialize: function(options) {
      this.app = options.app;
      this.collection = new SuggestionCollection();
      this.allSuggestions = new SuggestionCollection();
     
      this.bindTo(this.app.itemCollection, 'reset', this.setSuggestions, this); 
      this.bindTo(this.collection, 'change', this.render);
      this.bindTo(vent, 'suggestion:copy', this.copySuggestion, this);
      this.bindTo(vent, 'suggestion:choose', this.chooseSuggestion, this);
    },
    events: {
      'focus input[name=note]': 'displayForm',
      'keyup input[name=note]': 'updateSuggestions',
      'click #input-background': 'hideForm',
      'click #category-button': 'toggleCategories',
      'click #category-options li': 'chooseCategory',
      'click #save-button': 'saveNewItem',
    },
    displayForm: function() {
      this.$('#category-options').hide();
      this.$el.removeClass('inactive');
      this.updateSuggestions();
    },
    setSuggestions: function() {
      var allSuggestions = this.allSuggestions;
      allSuggestions.reset();
      
      this.app.itemCollection.chain().filter(function(item) {
        return !_.isEmpty(item.get('note'));
      }).groupBy(function(item) {
        return item.get('note').toLowerCase();
      }).sortBy(function(items) {
        return - items.length;
      }).map(function(items) {
        return _.first(items);
      }).each(function(item) { allSuggestions.add(item); });
    },
    updateSuggestions: function() {
      var userInput = this.$('input[name=note]').val().toLowerCase();
      var collection = this.collection;
      collection.reset();

      this.allSuggestions.chain().filter(function(item) {
        return item.get('note').toLowerCase().indexOf(userInput) !== -1;
      }).first(10).each(function(item) { collection.add(item); });
    },
    hideSuggestions: function() {
      this.collection.reset();
    },
    hideForm: function() {
      this.$el.addClass('inactive');
    },
    copySuggestion: function(item) {
      this.$('input[name=note]').val(item.get('note'));
      this.chooseCategory(item.get('category'));
      this.hideSuggestions();
    },
    chooseSuggestion: function(item) {
      this.copySuggestion(item);
      this.saveNewItem();
    },
    toggleCategories: function() {
      this.$('#category-options').toggle();
      this.hideSuggestions();
    },
    chooseCategory: function(arg) {
      var category;

      // We accept both a category name or a click event.
      if (_.isString(arg)) {
        category = this.$('#category-options li.' + arg);
      }
      else {
        category = $(arg.target);
      }

      this.$('input[name=category]').val(category.attr('data-category'));
      this.$('#category-button').html(category.html());
      this.$('#category-options').hide();
    },
    appendHtml: function(collectionView, itemView, index){
      collectionView.$("#note-suggestions").append(itemView.el);
    },
    saveNewItem: function(e) {
      if (!_.isUndefined(e)) {
        e.preventDefault();
      }

      // Prevent double-saving and indicate activity.
      this.$('#save-button').unbind('click').removeClass('btn-primary').html(LoaderTemplate);

      var item = new ItemModel();

      item.set({
        category: this.$('[name=category]').val(),
        note: this.$('[name=note]').val()
      });

      var v = this;
      item.on("sync", function() {
        v.hideForm();
        v.clearForm();
      });

      item.save({wait: true});

      item.set({created: new Date().getTime()/1000});
      this.app.itemCollection.unshift(item);
    },
    clearForm: function() {
      this.render();
    }
  });
})
