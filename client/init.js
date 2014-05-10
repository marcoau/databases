// var app = new App();
// var appView = new AppView({model: app});
// $('body').append(appView.$el);

$('body').append(new AppView({model: new App()}).$el);
