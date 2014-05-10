var ChatsView = Backbone.View.extend({
  className: 'chats',
  initialize: function(){
    this.render();
    this.collection.on('add set remove', function(){
      this.render();
    }, this);
  },
  render: function(){
    //??
    this.$el.html('');
    this.collection.each(function(chat){
      this.$el.append(new ChatView({model: chat}).$el);
    }, this);
    return this.$el;
  }
});
