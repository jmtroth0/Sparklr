Sparklr.Views.EditUserInfo = Backbone.View.extend({
  template: JST['user/edit_form'],

  initialize: function(options){
    this.listenTo(Sparklr.currentUser, "sync change", this.render);
  },

  events: {
    'submit form': 'submit',
    'change #input-prof-pic': "fileInputChange",
  },

  render: function(){
    this.$el.html(this.template({ user: Sparklr.currentUser }));

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var $form = $(e.currentTarget);
    var userData = $form.serializeJSON().user;
    var user = new Sparklr.Models.User();
    user.set(userData);
    user.save({}, {
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      },
      error: function(data){
        alert("Form invalid");
      }
    });
  },
})
