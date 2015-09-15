Sparklr.Views.AlbumIndexItem = Backbone.View.extend({
  template: JST['album/indexItem'],
  tagName: 'li',
  className: 'albumIndexItem group',

  initialize: function (options) {
    this.album = options.album;
    this.albums = options.albums;
    this.listenTo(this.album, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ album: this.album }));
    return this;
  },
})
