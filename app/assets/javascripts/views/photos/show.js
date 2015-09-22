Sparklr.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photo/show'],

  events: {
    'click button.return-to-album': 'backToAlbum',
  },

  initialize: function (options) {
    this.user = options.user || Sparklr.currentUser;
    if (options.album_id) {
      this.albumURL = "#/albums/" + options.album_id;
    } else {
      this.albumURL = "#/photostream"
    }
    this.photo = options.photo;
    this.listenTo(this.photo, 'sync', this.render);
  },

  render: function () {
    var uploader = this.photo.get('user');
    this.$el.html(this.template({
      photo: this.photo,
      albumUrl: this.albumURL,
    }));
    if (this.photo.dimensions){
      this.$el.find('.image-container').width(this.photo.dimensions[0]);
      this.$el.find('.image-container').height(this.photo.dimensions[1]);
      this.$el.find('.background').height(this.photo.dimensions[1] + 100)
    }
    return this;
  },
});
