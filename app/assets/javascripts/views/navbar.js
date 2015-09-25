Sparklr.Views.NavBar = Backbone.View.extend({
  template: JST['shared/navbar'],
  tagName: 'nav',
  className: 'main-navbar',

  events: {
    'click img.profile-pic': 'toggleSettings',
    "click button#sign-out": "signOut",
    "click button#sign-in": "signIn",
    "click .upload-link": "openUploadForm",
    "click .close-modal": "closeUploadForm",
    "submit form.search": "initiateSearch",
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
    if (!Sparklr.currentUser.isSignedIn()){
      addSignedOutWarning();
      return;
    };

    var uploadView = new Sparklr.Views.PhotoForm();
    if (this.$el.find('.form-modal')){
      this.$el.find('.form-modal').remove();
    };
    this.$el.append(JST['shared/modal']);
    this.$el.find('article.form-content').prepend(uploadView.render().$el);
    this.$el.find('.form-modal').addClass('is-active');
    this.listenTo(Sparklr.currentUser.photos(), 'add', this.closeUploadForm);
  },

  closeUploadForm: function () {
    this.$el.find('section.form-modal').removeClass('is-active');
  },

  initiateSearch: function (e) {
    e.preventDefault();
    var searchQuery = this.$(".search-query").val();
    Backbone.history.navigate("search/" + searchQuery, { trigger: true} );
  },

  addSignedOutWarning: function () {
    $warning = $('<div class="sign-in-warning">');
    $warning.html("<h4 class='sign-in-warning'>Please Sign in First</h4>");
    $('div#main').prepend($warning);
  },

  signOut: function (e) {
    e.preventDefault();
    Sparklr.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", { trigger: true })
      }
    })
  },

  signIn: function (e) {
    Backbone.history.navigate("session/new", { trigger: true })
  }
})
