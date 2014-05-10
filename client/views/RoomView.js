var RoomView = Backbone.View.extend({
  className: 'currentRoom',
  template: _.template('<span>You are in room:</span><br><span class="roomName"><%= currentRoom %></span>' + 
    '<button class="changeRoom">Change</button><input class="newRoom" placeholder="New Room" />'),
  events: {
    'click .changeRoom': function(){
      $('.newRoom').show();
      $('.newRoom').focus();
    },
    'keydown .newRoom': function(e){
      if(e.keyCode === 13){
        this.model.set({currentRoom: $('.newRoom').val()});
        $('.newRoom').val('');
        $('.newRoom').hide();
      }else if(e.keyCode === 27){
        $('.newRoom').val('');
        $('.newRoom').hide();
      }
    },
    'blur .newRoom': function(){
      $('.newRoom').val('');
      $('.newRoom').hide();
    }

  },
  initialize: function(){
    this.render();
    this.model.on('change:currentRoom', function(){
      this.render();
    }, this);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
