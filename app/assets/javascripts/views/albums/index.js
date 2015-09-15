Sparklr.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['album/index'],

  initialize: function (options) {
    this.albums = options.albums;
    this.listenTo(this.albums, 'sync remove', this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.albums.each(function (album) {
      this.addAlbum(album);
    }.bind(this))
    return this;
  },

  addAlbum: function (album) {
    var albumView = new Sparklr.Views.AlbumIndexItem ({
      album: album,
      albums: this.albums,
    });

    this.addSubview('ul.album-list', albumView);
  },
})
