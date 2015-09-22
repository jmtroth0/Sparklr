Sparklr.Views.AlbumIndexItem = Backbone.View.extend({
  template: JST['album/indexItem'],
  tagName: 'li',
  className: 'albumIndexItem group',

  events: {
    'click button.delete-album': 'deleteAlbum',
  },

  initialize: function (options) {
    this.album = options.album;
    this.albums = options.albums;
    this.listenTo(this.album, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ album: this.album }));
    return this;
  },

  deleteAlbum: function () {
    this.album.destroy();
  }
})
