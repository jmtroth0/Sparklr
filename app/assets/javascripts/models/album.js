Sparklr.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',

  parse: function (payload) {
    if (payload.photos) {
      this.photos().set(payload.photos);

      delete payload.photos;
    } else if (payload.cover_photo) {
      this.coverPhoto() = payload.coverPhoto;
    };

    return payload;
  },

  photos: function () {
    this._photos = this._photos ||
        new Sparklr.Collections.Photos([], { album: this });

    return this._photos
  },

  coverPhoto: function () {
    this._coverPhoto = this._coverPhoto || new Sparklr.Models.Photo();

    return this._coverPhoto
  }
});

Sparklr.Models.Photostream = Sparklr.Models.Album.extend({
  url: 'api/photostream',

  initialize: function (options) {
    this.url = options && options.url || this.url;
  },
});

Sparklr.Models.FavoritePhotos = Sparklr.Models.Album.extend({
  url: 'api/favorites',

  initialize: function (options) {
    this.url = options && options.url || this.url;
  },
})
