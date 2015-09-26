Sparklr.Views.SignIn = Backbone.View.extend({
  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Sparklr.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
    "click button.guest-sign-in": 'guestSignIn',
  },

  template: JST['user/form'],

  render: function(){
    var user = new Sparklr.Models.User();
    this.$el.html(this.template({user: user}));

    return this;
  },

  submit: function(e, options){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;
    Sparklr.currentUser.signIn({
      email: formData && formData.email || options.email,
      password: formData && formData.password || options.password,
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      },
      error: function() {
        alert("Bad combination of email/password. Please try again");
      },
    });
  },

  signInCallback: function(e){
    if(this.callback){
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  guestSignIn: function (e){
    e.preventDefault();
    this.submit(e, {email: 'guest@yahoo.com', password: 'password'})
  }

})
