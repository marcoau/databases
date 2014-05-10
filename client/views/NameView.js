var NameView = Backbone.View.extend({
  className: 'currentName',
  template: _.template('<span>Current username:</span><br><span class="name">@<%= username %></span>' +
    '<button class="changeName">Change</button><input class="newName" placeholder="New Name" />'),
  events: {
    'click .changeName': function(){
      $('.newName').show();
      $('.newName').focus();
    },
    'keydown .newName': function(e){
      if(e.keyCode === 13){
        this.model.set({username: $('.newName').val()});
        $('.newName').val('');
        $('.newName').hide();
      }else if(e.keyCode === 27){
        $('.newName').val('');
        $('.newName').hide();
      }
    },
    'blur .newName': function(){
      $('.newName').val('');
      $('.newName').hide();
    }
  },
  initialize: function(){
    this.render();
    this.model.on('change:username', function(){
      this.render();
    }, this);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});
