Sparklr.Views.UsersForm = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['user/form'],

  events: {
    "submit form": "submit"
  },

  render: function(){
    var html = this.template({ user: this.model, status: "new" });
    this.$el.html(html);

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
      success: function(){
        Sparklr.currentUser = that.model
        Sparklr.currentUser.fetch();
        Backbone.history.navigate("", { trigger: true });
      },
      error: function(data){
        alert("Form invalid");
      }
    });
  }

});
