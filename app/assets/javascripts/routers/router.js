Sparklr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.makeNavBar();
    if(Sparklr.currentUser.isSignedIn()){
      this.albums = new Sparklr.Collections.Albums;
      this.albums.fetch();
    }
    Backbone.history.navigate("", { trigger: true });
  },

  routes: {
    "": "albumIndex",
    "_=_": "albumIndex",
    "users/new": "userNew",
    "users/:id": "userShow",
    "session/new": "signIn",
    "albums/new": "albumNew",
    "albums/:id": "albumShow",
  },

  albumIndex: function () {
    if (!this._requireSignedIn(this.albumNew.bind(this))) { return; }
    this.addUserCover();
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: this.albums
    });
    this._swapView(indexAlbumView);
  },

  albumNew: function () {
    if (!this._requireSignedIn(this.albumNew.bind(this))) { return; }

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
    this._swapView(showAlbumView);
  },

  userNew: function () {
    if (!this._requiresSignedOut()) { return; }

    var model = new Sparklr.Models.User();
    var formView = new Sparklr.Views.UsersForm({
      status: 'new',
      model: model,
    });

    this._swapView(formView);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Sparklr.Views.SignIn({
      status: 'session',
      callback: callback,
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!Sparklr.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Sparklr.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    };

    return true;
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
