var ChatView = Backbone.View.extend({
  className: 'chat',
  template: _.template('<div class="chatUsername">@<%- username %></div><div class="chatText"><%- text %></div>'),
  initialize: function(){
    this.render();
  },
  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
