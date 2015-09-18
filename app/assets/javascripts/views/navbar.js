Sparklr.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: 'nav',
  className: 'main-navbar',

  events: {
    'click img.profile-pic': 'toggleSettings',
    'click button.edit-user-info': 'editUserInfo',
    "click button#sign-out": "signOut",
  },

  initialize: function () {
    this.listenTo(Sparklr.currentUser, 'signIn signOut', this.render)
    this.render();
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

  signOut: function (e) {
    e.preventDefault();
    Sparklr.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true })
      }
    })
  },

  editUserInfo: function (e) {
    var editUserView = new Sparklr.Views.EditUserInfo();
  }
})
