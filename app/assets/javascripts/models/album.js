Sparklr.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',

  parse: function (payload) {
    if (payload.photos) {
      this.photos().set(payload.photos, {parse: true});

      delete payload.photos;
    } else if (payload.cover_photo) {
      debugger;
      this._coverPhoto = payload.cover_photo;
    };

    return payload;
  },

  photos: function () {
    this._photos = this._photos ||
        new Sparklr.Collections.Photos([], { album: this });

    return this._photos
  },

  cover_photo: function () {
    this._coverPhoto = this._coverPhoto || new Sparklr.Models.Photo();

    return this._coverPhoto
  }
})
