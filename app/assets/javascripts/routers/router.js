Sparklr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.makeNavBar();
    this.albums = new Sparklr.Collections.Albums;
    this.albums.fetch();
    Backbone.history.navigate("albums", { trigger: true })
  },

  routes: {
    "": "albumIndex",
    "users/new": "userNew",
    "users/:id": "userShow",
    "session/new": "signIn",
    "albums/new": "albumNew",
    "albums/:id": "albumShow",
  },

  albumIndex: function () {
    this.addUserCover();
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: this.albums
    });
    this._swapView(indexAlbumView);
  },

  albumNew: function () {
    this.addUserCover();
    var newAlbum = new Sparklr.Models.Album();
    var newAlbumView = new Sparklr.Views.AlbumForm({
      album: newAlbum,
      albums: this.albums,
    });
    this._swapView(newAlbumView);
  },

  albumShow: function (id) {
    this.addUserCover();
    var album = this.albums.getOrFetch(id);
    var showAlbumView = new Sparklr.Views.AlbumShow({
      model: album
    });
    this._swapView(showAlbumView)
  },

  userNew: function () {
    var model = new Sparklr.Models.User();
    var formView = new Sparklr.Views.UsersForm({
      status: 'new',
      model: model,
    });

    this._swapView(formView);
  },

  signIn: function(callback){
    var signInView = new Sparklr.Views.SignIn({
      status: 'session',
      callback: callback,
    });
    this._swapView(signInView);
  },

  _goHome: function() {
    Backbone.history.navigate("", { trigger: true });
  },

  addUserCover: function () {
    // top of main page when logged in and not 'exploring'
  },

  makeNavBar: function () {
    var $rootEl = $("div#main-navbar-container");
    var navView = new Sparklr.Views.NavBar();
    $rootEl.html(navView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(this._currentView.$el);
    this._currentView.render();
  }
});
