Sparklr.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: 'nav',
  className: 'main-navbar',

  events: {
    'click img.profile-pic': 'toggleSettings',
    'click button.sign-out': 'signOut',
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  toggleSettings: function () {
    this.$el.find('div.user-menu-container').
             find('div.nav-dropdown-container').
             toggleClass('visible')
  },

  signOut: function () {
    //implement with backbone auth
  }
})
