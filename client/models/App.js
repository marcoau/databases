var App = Backbone.Model.extend({
  initialize: function(){

    // this.set({chats: new Chats({})});
    this.set({chats: new Chats()});
    this.set({roomsList: new RoomsList()});
    this.set({currentRoom: 'lobby'});
    this.set({username: 'guest'});
    this.set({friendsList: new FriendsList()});

    var that = this;
    setInterval(function(){
      that.fetch();
    },3000);

    this.on('change:currentRoom', function(){
      this.fetch();
    }, this);
  },

  fetch: function(){
    var that = this;
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/chats',
      data: {roomname: that.get('currentRoom')},
      contentType: 'json',
      // dataType: 'json',
      success: function(response){
        console.log('fetch success');
        console.dir(response);
        console.log(typeof response);
        that.get('chats').set(JSON.parse(response));
        // console.log(that.get('chats'));
      },
      error: function(error){
        console.log('fetch fail');
        console.error(error);
      }
    });
  },

  send: function(text){
    var chat = {
      username: this.get('username'),
      text: text,
      roomname: this.get('currentRoom')
    };
    // console.log(chat);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/chats',
      data: JSON.stringify(chat),
      contentType: 'json',
      context: this,
      success: function(data){
        console.log('send success');
        this.fetch();
      },
      error: function(error){
        console.log('send fail');
        console.error(error);
      }
    })
  },

});
