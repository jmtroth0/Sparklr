Sparklr.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photo/show'],

  events: {
    'click button.return-to-album': 'backToAlbum',
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.album_id = options.album_id
    this.photostream = options.photostream
    this.listenTo(this.photo, 'sync', this.render);
  },

  render: function () {
    this.uploader = this.photo.get('uploader');
    this.setSourceUrl();
    this.$el.html(this.template({
      photo: this.photo,
      sourceUrl: this.sourceURL,
      independent: this.independent,
    }));
    if (this.photo.dimensions){
      this.$el.find('.image-container').width(this.photo.dimensions[0]);
      this.$el.find('.image-container').height(this.photo.dimensions[1]);
      this.$el.find('.background').height(this.photo.dimensions[1] + 100)
    };

    var subPhotoView = new Sparklr.Views.PhotoShowSub({photo: this.photo})
    this.$el.find('.image-container').append(subPhotoView.render().$el);
    // when I build out the subview, it won't be in this container
    return this;
  },

  setSourceUrl: function () {
    if (this.album_id) {
      this.sourceURL = "#/albums/" + this.album_id;
    } else if (this.photostream){
      this.sourceURL = "#/photostream"
    } else if (this.uploader){
      this.sourceURL = "#/users/" + this.uploader.id + "/albums"
      this.independent = true;
    }
  }
});
