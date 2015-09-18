Sparklr.Views.SignIn = Backbone.View.extend({
  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Sparklr.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
  },

  template: JST['user/form'],

  render: function(){
    var user = new Sparklr.Models.User();
    this.$el.html(this.template({user: user}));

    return this;
  },

  submit: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;

    Sparklr.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function(){
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(){
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

})
