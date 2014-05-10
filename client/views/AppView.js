var AppView = Backbone.View.extend({
  className: 'app',
  events:{
    'keydown .inputChat': function(event){
      if(event.keyCode === 13){      
        event.preventDefault();
        this.model.send($('.inputChat').val());
        $('.inputChat').val('');
      }
    },
    'click .submitChat': function(event){
      event.preventDefault();
      this.model.send($('.inputChat').val());
      $('.inputChat').val('');
    }
  },
  initialize: function(){
    this.$left = $('<div class="left"></div');
    this.$settings = $('<div class="settings"></div>');
    this.$right = $('<div class="right"></div>')
    this.$title = $('<div class="title"><h1>node.Chat</h1></div>');
    this.nameView = new NameView({model: this.model});
    this.roomView = new RoomView({model: this.model});
    this.$input = $('<div class="input"><textarea class="inputChat" type="text" placeholder="Enter chat here!" />' + 
      '<button class="submitChat">Chat!</button></div>')
    this.chatsView = new ChatsView({collection: this.model.get('chats')});
    this.render();
  },
  render: function(){
    this.$el.append(this.$left);
    this.$el.append(this.$right);
    this.$left.append(this.$title);
    this.$left.append(this.$settings);
    this.$settings.append(this.nameView.$el);
    this.$settings.append(this.roomView.$el);
    this.$right.append(this.$input);
    this.$right.append(this.chatsView.$el);
    return this.$el;
  }
});
