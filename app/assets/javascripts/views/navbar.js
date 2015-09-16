Sparklr.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: 'nav',
  className: 'main-navbar',


  render: function () {
    this.$el.html(this.template());
    return this;
  },

  signOut: function () {
    
  }
})
