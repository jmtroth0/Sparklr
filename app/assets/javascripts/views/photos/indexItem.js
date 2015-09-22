Sparklr.Views.PhotoIndexItem = Backbone.View.extend({
  template: JST['photo/indexItem'],
  tagName: 'li',
  className: 'photoIndexItem group',
  //
  // events: {
  //   'click button.delete-photo': 'deletePhoto',
  // },

  initialize: function (options) {
    this.photo = options.photo;
    this.photoUrl = "#"
    if (typeof options.album_id === "number") {
      this.photoUrl = "/albums/" + options.album_id
    }
    this.photoUrl += "/photos/" + this.photo.id
    // this.photos = options.photos;
    // this.listenTo(this.photo, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, photoUrl: this.photoUrl }));
    return this;
  },
  //
  // removePhotoFromAlbum: function () {
          //  should only remove photo from album deleting the album show view
  //   this.photo.destroy();
  // }
})
