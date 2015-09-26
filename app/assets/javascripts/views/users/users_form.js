Sparklr.Views.UsersForm = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['user/form'],

  events: {
    "submit form": "submit",
    "click button.guest-sign-in": 'guestSignIn',
  },

  render: function(){
    var html = this.template({ user: this.model, status: "new" });
    this.$el.html(html);

    return this;
  },

  submit: function(e, options){
    e.preventDefault();

    var $form = $(e.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;
    this.model.set(userData);
    this.model.save({}, {
      success: function(){
        Sparklr.currentUser.fetch({
          success: function() {
            Backbone.history.navigate("", { trigger: true });
          },
        });
      },
      error: function(data){
        alert("Form invalid");
      }
    });
  },

  guestSignIn: function (e){
    e.preventDefault();
    Sparklr.currentUser.signIn({
      email: 'guest@yahoo.com',
      password: 'password',
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      },
    });
  }

});
