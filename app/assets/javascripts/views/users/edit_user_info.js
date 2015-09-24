Sparklr.Views.EditUserInfo = Backbone.View.extend({
  template: JST['user/edit_form'],

  initialize: function(options){
    this.listenTo(Sparklr.currentUser, "sync change", this.render);
  },

  events: {
    'submit form': 'submit',
  },

  render: function(){
    this.$el.html(this.template({ user: Sparklr.currentUser }));

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var $form = $(e.currentTarget);
    var userData = $form.serializeJSON().user;
    for(var attr in userData) {
      if (userData[attr]){
        Sparklr.currentUser.set(attr, userData[attr]);
      }
    }
    Sparklr.currentUser.save({}, {
      url: "/api/users/" + Sparklr.currentUser.id,
      success: function(){
        Backbone.history.navigate("user/edit", { trigger: true });
      },
      error: function(data, resp){
        alert(resp.responseJSON.join());
      }
    });
  },




})
