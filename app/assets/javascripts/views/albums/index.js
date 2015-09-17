Sparklr.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['album/index'],
  className: 'index',

  events: {
    'click button.open-form': 'addForm',
    'click button.close-form': 'closeForm',
  },

  initialize: function (options) {
    this.albums = options.albums;
    this.listenTo(this.albums, 'sync remove add', this.render);
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

  addForm: function () {
    var album = new Sparklr.Models.Album();
    this._albumFormView = new Sparklr.Views.AlbumForm({
      album: album,
      albums: this.albums
    });
    this.addSubview('div.album-form-container', this._albumFormView);
    this.$el.find('button.open-form').removeClass('visible');
    this.$el.find('button.close-form').addClass('visible');
    return this;
  },

  closeForm: function () {
    this.removeSubview('div.album-form-container', this._albumFormView)
    this.$el.find('button.open-form').addClass('visible');
    this.$el.find('button.close-form').removeClass('visible');
    return this;
  },
})
