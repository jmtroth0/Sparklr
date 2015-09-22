Sparklr.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['album/index'],
  className: 'index',

  events: {
    'click button.open-form': 'addForm',
    'click button.close-form': 'closeForm',
  },

  initialize: function (options) {
    this.albums = options.albums;
    this.user = options && options.user || Sparklr.currentUsers
    this.listenTo(this.albums, 'sync', this.render);
    this.listenTo(this.albums, 'remove', this.removeAlbum)
  },

  render: function () {
    this.$el.html(this.template());
    this.placeAlbums();
    this.addUserCover();
    return this;
  },

  placeAlbums: function () {
    this.$el.find("ul.album-list").html("");
    if (this.albums && this.albums.length > 0) {
      this.albums.each(function (album) {
        this.addAlbum(album);
      }.bind(this))
    } else {
      var $h1 = $('<h1>');
      $h1.html("No albums found");
      this.$el.prepend($h1);
    };
  },

  addAlbum: function (album) {
    var albumView = new Sparklr.Views.AlbumIndexItem ({
      album: album,
      albums: this.albums,
    });

    this.addSubview('ul.album-list', albumView, true);
  },

  removeAlbum: function (album, collection) {
    this.removeModelSubview('ul.album-list', album);
    this.placeAlbums();
  },

  addForm: function (e) {
    var album = new Sparklr.Models.Album();
    this._albumFormView = new Sparklr.Views.AlbumForm({
      album: album,
      albums: this.albums
    });
    this.addSubview('article.form-content', this._albumFormView, true);
    this.$el.find('.form-modal').addClass('is-active');
    this.$el.find('button.open-form').removeClass('visible');
    this.$el.find('button.close-form').addClass('visible');
    return this;
  },

  closeForm: function () {
    this.removeSubview('div.album-form-container', this._albumFormView);
    this.$el.find('.form-modal').removeClass('is-active');
    this.$el.find('button.open-form').addClass('visible');
    this.$el.find('button.close-form').removeClass('visible');
    this._albumFormView = null;
  },
})
