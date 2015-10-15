Sparklr.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photo/show'],

  events: {
    'click button.delete-photo-form': 'openDeletePhotoForm',
    'click button.delete-photo': "deletePhoto",
    'click button.close-delete-modal': "closeDeletePhotoForm",
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.album_id = options.album_id;
    this.photostream = options.photostream;
    this.recentPhoto = options.recentPhoto;
    this.listenTo(this.photo, 'sync', this.render);
  },

  render: function () {
    this._setSourceUrl();

    this.$el.html(this.template({
      photo: this.photo,
      sourceUrl: this.sourceURL,
      independent: this.independent,
    }));

    var subPhotoView = new Sparklr.Views.PhotoShowSub({photo: this.photo});
    this.$el.find('.image-container').append(subPhotoView.render().$el);
    return this;
  },

  _setSourceUrl: function () {
    var uploader = this.photo.get('uploader');
    if (this.recentPhoto) {
      this.sourceURL = "#/photos/recent";
    } else if (uploader) {
      if (this.album_id) {
        this.sourceURL = "#/albums/" + this.album_id;
      } else if (this.photostream){
        if (uploader.id === Sparklr.currentUser.id){
          this.sourceURL = "#/photostream";
        } else {
          this.sourceURL = "#/users/" + uploader.id + "/photostream";
        }
      } else {
        if (uploader) {
          this.sourceURL = "#/users/" + this.photo.get('uploader').id + "/albums";
        }
        this.independent = true;
      }
    } else {
      this.sourceURL = "#";
    }
  },

  _setImageDimensions: function () {
    this.$el.find('.image-container').width(this.photo.dimensions[0]);
    this.$el.find('.image-container').height(this.photo.dimensions[1]);
    this.$el.find('.background').height($('.image-container').height + 100);
  },

  openDeletePhotoForm: function () {
    this.$el.append(JST['photo/delete_form']);
  },

  closeDeletePhotoForm: function () {
    this.$el.find('section.form-modal').remove();
  },

  deletePhoto: function () {
    this.photo.destroy();
    Backbone.history.navigate(this.sourceURL, { trigger: true })
  },
});
