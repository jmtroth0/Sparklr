Sparklr.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['album/show'],

  events: {
    'click button.return-to-albums': 'backToAlbums',
    'click button.open-form': 'addForm',
    'click button.close-form': 'closeForm',
    'click button.delete-album': 'deleteAlbum',
    'click h1.album-title': 'editAlbumTitle',
    'submit form.album-title': 'submitEdit',
    'click h2.album-description': 'editAlbumDescription',
    'submit form.album-description': 'submitEdit',
  },

  initialize: function (options) {

    this.user = options && options.user || Sparklr.currentUser;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.model.photos(), 'add', this.addPhoto);
    this.listenTo(this.model.photos(), 'remove', this.removePhoto);
    this.listenTo(this.model.photos(), 'sync', this.render);
  },

  render: function () {
    var creator = this.model.get('user');
    var email = creator && creator.email;
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
    var album_identifier = photostream || this.model.id;
    var photoView = new Sparklr.Views.PhotoIndexItem ({
      photo: photo,
      photos: this.model.photos(),
      album_id: album_identifier,
    });
    this.addSubview('ul.photo-list', photoView);
  },

  removePhoto: function (photo) {
    this.removeModelSubview('ul.photo-list', photo)
  },

  deleteAlbum: function () {
    this.model.destroy();
    Backbone.history.navigate("", { trigger: true })
  },

  editAlbumTitle: function (e) {
    var $form = $('<form class="album-title">');
    var $input = $('<input type=text class="album-title" value="' +
      this.model.escape('title') +
      '" name="album[title]">');
    $form.html($input);
    this.$el.find('div.album-title').html($form);
  },

  editAlbumDescription: function (e) {
    var $form = $('<form class="album-description">')
    var $input = $('<input type=text class="album-description" value="' +
      this.model.escape('description') +
      '" name="album[description]">');
    $form.html($input);
    this.$el.find('div.album-description').html($form);
  },

  submitEdit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    var self = this;
    this.model.save(attrs, {
      success: function () {
        debugger;
        self.$el.find('div.album-title').html("<h1 class='album-title'>" + album.escape('title') + "</h1>")
        self.$el.find('div.album-description').html("<h1 class='album-description'>" + album.escape('description') + "</h1>")
      },

      error: function (model, response) {
        $('.form-errors').empty();
        response.responseJSON.forEach(function (el) {
          var $li = $('<li>');
          $li.text(el);
          $('.form-errors').append($li);
        });
      },
    });
  },

  addForm: function (e) {
    if (this instanceof Sparklr.Views.PhotostreamShow) {
      this._photoFormView = new Sparklr.Views.PhotoForm();
    } else {
      this._photoFormView = new Sparklr.Views.PhotoForm({
        album_id: this.model.id,
        photos: this.model.photos(),
      });
    }
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
