Sparklr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Sparklr.currentUser = new Sparklr.Models.CurrentUser();
    Sparklr.currentUser.fetch({success: function () {
      if (Sparklr.currentUser.isSignedIn()) {
        Sparklr.currentFavoritePhotos = new Sparklr.Models.FavoritePhotos({
          url: 'api/users/' + Sparklr.currentUser.id + '/favorites'
        })
        Sparklr.currentFavoritePhotos.fetch({reset: true});
      }
    }});
    this._makeNavBar();
    this._makeFooter();
    this.users = new Sparklr.Collections.Users();
    this.photos = new Sparklr.Collections.Photos();
    Sparklr.albums = new Sparklr.Collections.Albums();
  },

  routes: {
    // general exploration stuff
    "photos/recent": "recentPhotos",
    "search/:query": "search",
    "search/users/:query": "userSearch",

    // own stuff
    "": "albumIndex",
    "_=_": "albumIndex",
    "photos/:id": "photoShow",
    "albums/new": "albumNew",
    "albums/:id": "albumShow",
    "photostream": "photostreamShow",
    "favorites": "showFavorites",

    // other's stuff
    "users/:user_id/albums": "userAlbumIndex",
    "users/:user_id/photostream": "userPhotostreamShow",
    "albums/:album_id/photos/:id": "albumPhotoShow",
    "photostream/:stream_id/photos/:id": "streamPhotoShow",
    "recent/photos/:id": "recentPhotoShow",
    "users/:user_id/favorites": "showUserFavorites",


    // auth stuff
    "users/new": "userNew",
    "session/new": "signIn",
    "users/:id": "userShow",
    "user/edit": "userEdit",
  },

  albumIndex: function (options) {
    if (!this._requireSignedIn(this.albumIndex.bind(this))) { return; }
    var albums = (options && options.albums) || Sparklr.albums;
    var user = (options && options.user) || Sparklr.currentUser;
    albums.fetch();
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: albums,
      user: user
    });
    this._swapView(indexAlbumView);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);

    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
    });

    this._swapView(showPhotoView);
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
    var photostream = Sparklr.currentUser.photostream();
    photostream.fetch();
    var showPhotostreamView = new Sparklr.Views.PhotostreamShow({
      model: photostream
    });

    this._swapView(showPhotostreamView);
  },

  showFavorites: function () {
    if (!this._requireSignedIn(this.showFavorites.bind(this))) { return; }

    var favorites = new Sparklr.Models.FavoritePhotos({
      url: "api/users/" + Sparklr.currentUser.id + "/favorites"
    });
    favorites.fetch();

    var favoritesView = new Sparklr.Views.ShowFavorites({
      user: Sparklr.currentUser,
      model: favorites
    });

    this._swapView(favoritesView);
  },

// other stuff
  userAlbumIndex: function (user_id){
    var userAlbums = new Sparklr.Collections.Albums({
      url: "api/users/" + user_id + "/albums",
    });
    userAlbums.fetch();
    var user = this.users.getOrFetch(user_id);
    var indexAlbumView = new Sparklr.Views.AlbumIndex({
      albums: userAlbums,
      user: user,
    });
    this._swapView(indexAlbumView);
  },

  userPhotostreamShow: function (user_id) {
    if (!this._requireSignedIn(this.userPhotostreamShow.bind(this, user_id))) { return; }
    var user = this.users.getOrFetch(user_id);
    var photostream = user.photostream({url: "api/users/" + user_id + "/photostream"});
    photostream.fetch();
    var showPhotostreamView = new Sparklr.Views.PhotostreamShow({
      model: photostream,
      user: user
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
    if (!this._requireSignedIn(
      this.streamPhotoShow.bind(this, stream_id, id)
    )) { return; }
    var photo = Sparklr.currentUser.photos().getOrFetch(id);

    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
      photostream: true,
    });
    this._swapView(showPhotoView);
  },

  recentPhotoShow: function (id) {
    var photo = Sparklr.currentUser.photos().getOrFetch(id);

    var showPhotoView = new Sparklr.Views.PhotoShow({
      photo: photo,
      recentPhoto: true,
    });
    this._swapView(showPhotoView);
  },

  showUserFavorites: function (user_id) {
    if (!this._requireSignedIn(this.showUserFavorites.bind(this, user_id))) { return; }
    var user = this.users.getOrFetch(user_id);
    var favorites = user.favorites({url: "api/users/" + user_id + "/favorites"});
    favorites.fetch();
    var showFavoritesView = new Sparklr.Views.ShowFavorites({
      model: favorites,
      user: user
    });

    this._swapView(showFavoritesView);
  },

  recentPhotos: function () {
    var photos = new Sparklr.Collections.RecentPhotos();

    var showPhotos = new Sparklr.Views.PhotoIndex({photos: photos, source: "recentPhotos"});

    this._swapView(showPhotos);
  },

  search: function (query) {
    var searchView = new Sparklr.Views.Search({ searchQuery: query, type: 'SearchResults' });

    this._swapView(searchView);
  },

  userSearch: function (query) {
    var searchView = new Sparklr.Views.Search({ searchQuery: query, type: 'UserSearchResults' });

    this._swapView(searchView);
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

  _makeNavBar: function () {
    var $rootEl = $("div#main-navbar-container");
    var navView = new Sparklr.Views.NavBar();
    $rootEl.html(navView.render().$el);
  },

  _makeFooter: function () {
    var $rootEl = $("div#backdrop");
    var footView = new Sparklr.Views.Footer();
    $rootEl.append(footView.render().$el);
  },

  _swapView: function (view) {
    $('#backdrop').attr('style', "");
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.$el);
    this._currentView.render();
  }
});
