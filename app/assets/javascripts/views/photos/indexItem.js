Sparklr.Views.PhotoIndexItem = Backbone.View.extend({
  template: JST['photo/indexItem'],
  tagName: 'li',
  className: 'photoIndexItem group',

  events: {
    'click button.set-cover-photo': 'setCoverPhoto',
    'click button.set-profile-photo': 'setProfilePhoto',
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.photoUrl = "#";
    if (options.source === "recentPhotos"){
      this.photoUrl += "/recent";
    } else if (typeof options.album_id === "number") {
      this.photoUrl += "/albums/" + options.album_id;
    } else {
      this.photoUrl += "/photostream/" + this.photo.get('uploader').id;
    }
    this.photoUrl += "/photos/" + this.photo.id;
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, photoUrl: this.photoUrl }));
    return this;
  },

  setCoverPhoto: function (e) {
    e.preventDefault();
    if (!Sparklr.router._requireSignedIn(this.setCoverPhoto.bind(this, e))){ return; }
    Sparklr.currentUser.save({ cover_photo_id: this.photo.id }, {
      url: (function () { return 'api/users/' + Sparklr.currentUser.id; }())
    });
  },

  setProfilePhoto: function (e) {
    e.preventDefault();
    if (!Sparklr.router._requireSignedIn(this.setProfilePhoto.bind(this, e))) { return; }
    Sparklr.currentUser.save({ profile_pic_id: this.photo.id }, {
      url: (function () { return 'api/users/' + Sparklr.currentUser.id; }())
    });
  },

  // requireSignedIn: function (callback) {
  //   if (!Sparklr.currentUser.isSignedIn()) {
  //     callback = callback || this._goHome.bind(this);
  //     Sparklr.Routers.Router.signIn(callback);
  //     return false;
  //   }
  //
  //   return true;
  // }
});
