Sparklr.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'index',

  initialize: function (options) {
    this.photos = options.photos;
    this.listenTo(this.photos, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.placePhotos();
    return this;
  },

  placePhotos: function () {
    this.$el.find("ul.photo-list").html("");
    if (this.photos && this.photos.length > 0) {
      this.photos.each(function (photo) {
        this.addPhoto(photo);
      }.bind(this))
    }
  },

  addPhoto: function (photo) {
    var photoView = new Sparklr.Views.PhotoIndexItem ({
      photo: photo,
      photos: this.photos,
    });

    this.addSubview('ul.photo-list', photoView);
  },
})
