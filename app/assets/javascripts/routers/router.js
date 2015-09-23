Sparklr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.makeNavBar();
    this.makeFooter();
    this.users = new Sparklr.Collections.Users();
    this.photos = new Sparklr.Collections.Photos();
    Sparklr.albums = new Sparklr.Collections.Albums;
    if (Sparklr.currentUser.isSignedIn()){
      Sparklr.albums.fetch();
    };
  },

  routes: {
    "": "albumIndex",
    "_=_": "albumIndex",
    "users/new": "userNew",
    "users/:id": "userShow",
    "user/edit": "userEdit",
    "users/:user_id/photos": "photosIndex",
    "users/:user_id/albums": "userAlbumIndex",
    "users/:user_id/photostream": "userPhotostreamShow",
    "photos/:id": "photoShow",
    "albums/new": "albumNew",
    "albums/:id": "albumShow",
    "albums/:album_id/photos/:id": "albumPhotoShow",
    "photostream": "photostreamShow",
    "photostream/:stream_id/photos/:id": "streamPhotoShow",
    "session/new": "signIn",
    "search": "search",
  },

  search: function (options) {
    var searchQuery = options && options.searchQuery;
    var searchView = new Sparklr.Views.Search({ searchQuery: searchQuery });

    this._swapView(searchView);
  },

  albumIndex: function (options) {
    if (!this._requireSignedIn(this.albumIndex.bind(this, options))) { return; }
    var albums = (options && options.albums) || Sparklr.albums;
    var user = (options && options.user) || Sparklr.currentUser;
    albums.fetch();
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: albums,
      user: user
    });
    this._swapView(indexAlbumView);
  },

  userAlbumIndex: function (user_id){
    var userAlbums = new Sparklr.Collections.Albums({
      url: "api/users/" + user_id + "/albums",
    });
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

  photostreamShow: function () {
    if (!this._requireSignedIn(this.photostreamShow.bind(this))) { return; }
    var user = Sparklr.currentUser
    var photostream = Sparklr.currentUser.photostream();
    photostream.fetch();
    var showPhotostreamView = new Sparklr.Views.PhotostreamShow({
      model: photostream
    });

    this._swapView(showPhotostreamView);
  },

  albumPhotoShow: function (album_id, id) {
    var album = Sparklr.albums.getOrFetch(album_id);
    var photo = album.photos().getOrFetch(id);
    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
      album_id: album_id,
    });
    this._swapView(showPhotoView);
  },

  streamPhotoShow: function (stream_id, id) {
    // add url protections?
    var photo = Sparklr.currentUser.photos().getOrFetch(id);

    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
      photostream: true,
    });
    this._swapView(showPhotoView);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);

    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
    })

    this._swapView(showPhotoView);
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

  makeFooter: function () {
    var $rootEl = $("div#backdrop");
    var footView = new Sparklr.Views.Footer();
    $rootEl.append(footView.render().$el);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(this._currentView.$el);
    this._currentView.render();
  }
});
