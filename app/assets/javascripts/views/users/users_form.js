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
    $('#backdrop').css('background-image', 'url(' + Sparklr.signInBackdropUrl + ')');
    var html = this.template({ user: this.model, status: "new" });
    this.$el.html(html);
    this.$el.append(this.addSiteInfo());

    return this;
  },

  addSiteInfo: function () {
    var $info = $('<div class="page-info">')
    $info.append('<h1 class="title-text">A Home for your photos to sparkl</h1>');
    return $info;
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
      error: function(data, resp){
        alert(resp.responseJSON.join(", "));
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
