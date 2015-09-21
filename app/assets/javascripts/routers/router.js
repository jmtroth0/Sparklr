Sparklr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.makeNavBar();
    this.users = new Sparklr.Collections.Users();
    if (Sparklr.currentUser.isSignedIn()){
      Sparklr.albums = new Sparklr.Collections.Albums;
      Sparklr.albums.fetch();
    }
    Backbone.history.navigate("", { trigger: true });
  },

  routes: {
    "": "albumIndex",
    "_=_": "albumIndex",
    "users/new": "userNew",
    "users/:id": "userShow",
    "user/edit": "userEdit",
    "session/new": "signIn",
    "photostream": "photostreamShow",
    "albums/new": "albumNew",
    "albums/:id": "albumShow",
    "users/:user_id/photos": "photosIndex",
    "users/:user_id/albums": "userAlbumIndex",
    "users/:user_id/photostream": "userPhotostreamShow",
  },

  albumIndex: function (options) {
    if (!this._requireSignedIn(this.albumNew.bind(this))) { return; }
    var albums = (options && options.albums) || Sparklr.albums;
    var user = (options && options.user) || Sparklr.currentUser;
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: albums,
      user: user
    });
    this._swapView(indexAlbumView);
  },

  userAlbumIndex: function (user_id){
    var userAlbums = new Sparklr.Collections.Albums({url: "api/users/" + user_id + "/albums"});
    userAlbums.fetch();
    var user = this.users.getOrFetch(user_id);
    this.albumIndex({albums: userAlbums, user: user});
  },

  albumNew: function () {
    if (!this._requireSignedIn(this.albumNew.bind(this))) { return; }
    var newAlbum = new Sparklr.Models.Album();
    var newAlbumView = new Sparklr.Views.AlbumForm({
      album: newAlbum,
      albums: Sparklr.albums,
    });
    this._swapView(newAlbumView);
  },

  albumShow: function (id) {
    var album = Sparklr.albums.getOrFetch(id);
    var showAlbumView = new Sparklr.Views.AlbumShow({
      model: album
    });
    this._swapView(showAlbumView);
  },

  photostreamShow: function (options) {
    var user = options && options.user || Sparklr.currentUser
    var photostream = Sparklr.currentUser.photostream();
    photostream.fetch();
    var showPhotostreamView = new Sparklr.Views.PhotostreamShow({
      model: photostream
    });

    this._swapView(showPhotostreamView);
  },

  photosIndex: function() {

  },

  userNew: function () {
    if (!this._requireSignedOut()) { return; }

    var model = new Sparklr.Models.User();
    var formView = new Sparklr.Views.UsersForm({
      status: 'new',
      model: model,
    });

    this._swapView(formView);
  },

  userEdit: function (id) {
    if (!this._requireSignedIn(this.userEdit.bind(this))) { return; }

    var formView = new Sparklr.Views.EditUserInfo();

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
