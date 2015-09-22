Sparklr.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['album/show'],

  events: {
    'click button.return-to-albums': 'backToAlbums',
    'click button.open-form': 'addForm',
    'click button.close-form': 'closeForm',
    'click button.delete-album': 'deleteAlbum',
  },

  initialize: function (options) {
    this.user = options && options.user || Sparklr.currentUser;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.photos(), 'add', this.addPhoto);
    this.listenTo(this.model.photos(), 'remove', this.removePhoto);
  },

  render: function () {
    var creator = this.model.get('user')
    email = creator && creator.email;
    var photos = this.model.photos();
    this.$el.html(this.template({
      album: this.model,
      numPhotos: photos.length,
      creator: email,
    }));
    photos.each(function (photo) {
      this.addPhoto(photo)
    }.bind(this))
    return this;
  },

  addPhoto: function (photo, photostream) {
    if (!photostream) {
      var photoView = new Sparklr.Views.PhotoIndexItem ({
        photo: photo,
        photos: this.model.photos(),
        album_id: this.model.id,
      });
    } else {
      var photoView = new Sparklr.Views.PhotoIndexItem ({
        photo: photo,
        photos: this.model.photos(),
        album_id: photostream,
      });
    }
    this.addSubview('ul.photo-list', photoView, true);
  },

  removePhoto: function (photo) {
    this.removeModelSubview('ul.photo-list', photo)
  },

  deleteAlbum: function () {
    this.model.destroy();
    Backbone.history.navigate("", { trigger: true })
  },

  addForm: function (e) {
    this._photoFormView = new Sparklr.Views.PhotoForm({
      album_id: this.model.id,
      photos: this.model.photos(),
    });
    this.addSubview('article.form-content', this._photoFormView, true);
    this.$el.find('.form-modal').addClass('is-active');
    this.$el.find('button.open-form').removeClass('visible');
    this.$el.find('button.close-form').addClass('visible');
    this.listenTo(this.model.photos(), 'add', this.closeForm);
    return this;
  },

  closeForm: function () {
    this.removeSubview('div.photo-form-container', this._photoFormView);
    this.$el.find('.form-modal').removeClass('is-active');
    this.$el.find('button.open-form').addClass('visible');
    this.$el.find('button.close-form').removeClass('visible');
    this._photoFormView = null;
  },

  backToAlbums: function(e) {
    e.preventDefault();
    Backbone.history.navigate("", { trigger: true })
  },
});


Sparklr.Views.PhotostreamShow = Sparklr.Views.AlbumShow.extend({
  className: 'album-show-container',

  render: function () {
    var coverView = new Sparklr.Views.UserCover({user: this.user})
    this.$el.html(this.template({ album: this.model, photostream: true }));
    coverView.addUserCover($('#main'));
    this.model.photos().each(function (photo) {
      this.addPhoto(photo, true)
    }.bind(this))
    return this;
  },
})
