Sparklr.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['album/show'],
  className: 'album-show-container',

  events: {
    'click button.open-form': 'addForm',
    'click button.close-form': 'closeForm',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.photos(), 'add', this.addPhoto);
    this.listenTo(this.model.photos(), 'remove', this.removePhoto)
  },

  render: function () {
    this.$el.html(this.template({ album: this.model }));
    this.model.photos().each(function (photo) {
      this.addPhoto(photo)
    }.bind(this))
    return this;
  },

  addPhoto: function (photo) {
    var photoView = new Sparklr.Views.PhotoIndexItem ({
      photo: photo,
      photos: this.model.photos(),
    });
    this.addSubview('ul.photo-list', photoView, true);
  },

  removePhoto: function (photo) {
    debugger;
    this.removeModelSubview('ul.photo-list', photo)
  },

  addForm: function (e) {
    this._photoFormView = new Sparklr.Views.PhotoForm({
      album_id: this.model.id,
      photos: this.model.photos(),
    });
    this.addSubview('div.photo-form-container', this._photoFormView, true);
    this.$el.find('button.open-form').removeClass('visible');
    this.$el.find('button.close-form').addClass('visible');
    this.listenTo(this.model.photos(), 'add', this.closeForm);
    return this;
  },

  closeForm: function () {
    this.removeSubview('div.photo-form-container', this._photoFormView)
    this.$el.find('button.open-form').addClass('visible');
    this.$el.find('button.close-form').removeClass('visible');
    this._photoFormView = null;
  },
})
