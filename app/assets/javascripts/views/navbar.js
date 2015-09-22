Sparklr.Views.NavBar = Backbone.View.extend({
  template: JST['shared/navbar'],
  tagName: 'nav',
  className: 'main-navbar',

  events: {
    'click img.profile-pic': 'toggleSettings',
    "click button#sign-out": "signOut",
    "click .upload-link": "openUploadForm",
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

  openUploadForm: function () {
    var uploadView = new Sparklr.Views.PhotoForm();
    this.$el.append(JST['shared/modal']);
    this.$el.find('article.form-content').html(uploadView.render().$el);
    this.$el.find('.form-modal').addClass('is-active');
  },

  signOut: function (e) {
    e.preventDefault();
    Sparklr.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true })
      }
    })
  },
})
